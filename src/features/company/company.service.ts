import { BadRequestException, Injectable } from "@nestjs/common";
import {
	CreateCompanyDto,
	CreateCompanyEmployeesDto,
} from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";
import { EntityManager, Repository } from "typeorm";
import { Company } from "./entities/company.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Role } from "src/features/role/entities/role.entity";
import { FileManagerService } from "src/configuration/file-manager/file-manager.service";
import { EmailService } from "src/configuration/email/email.service";
import { UserService } from "../user/user.service";
import { ConfigService } from "@nestjs/config";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { User } from "../user/entities/user.entity";

@Injectable()
export class CompanyService {
	constructor(
		private readonly configService: ConfigService,
		private readonly mailService: EmailService,
		private readonly fileManagerService: FileManagerService,
		@InjectRepository(Company)
		private readonly companyRepository: Repository<Company>,
		@InjectRepository(Role)
		private readonly rolesRepository: Repository<Role>,
		private readonly entityManager: EntityManager,
		private readonly userService: UserService,
	) {}

	async create(
		createCompanyDto: CreateCompanyDto,
	): Promise<{ company: Company; employees: string[] }> {
		const { name, uic, employees } = createCompanyDto;

		return await this.entityManager.transaction(
			async (transactionalEntityManager) => {
				const company = await transactionalEntityManager.save(
					new Company({ name, uic, logo: "" }),
				);

				await Promise.all(
					employees.map((employee) =>
						this.assignEmployeeToCompany(
							transactionalEntityManager,
							employee,
							company,
						),
					),
				);

				return {
					company,
					employees: employees.map((employee) => employee.email),
				};
			},
		);
	}

	public async addUserToCompany(companyId: string, employee: CreateUserDto) {
		return await this.entityManager.transaction(
			async (transactionalEntityManager) => {
				const company = await this.companyRepository.findOneBy({
					id: companyId,
				});

				await this.assignEmployeeToCompany(
					transactionalEntityManager,
					employee,
					company,
				);
			},
		);
	}

	public async findOne(id: string) {
		return this.companyRepository.findOneBy({ id });
	}

	public async getAllUsers(
		id: string,
	): Promise<Omit<User, "password" | "refreshToken">[]> {
		return this.userService.getAllCompanyUsers(id);
	}

	public async update(id: string, updateCompanyDto: UpdateCompanyDto) {
		const company = await this.companyRepository.findOneBy({ id });
		company.name = updateCompanyDto.name;
		await this.entityManager.save(company);
		return;
	}

	public async saveLogo(id: string, logo: Express.Multer.File) {
		const company = await this.companyRepository.findOne({ where: { id } });
		if (!company) {
			throw new BadRequestException("Company not found!");
		}

		const uploadResult = await this.fileManagerService.uploadCompanyLogo(logo, {
			companyId: id,
			companyName: company.name,
		});

		if (!uploadResult.success) {
			throw new Error("Failed to upload logo");
		}

		company.logo = uploadResult.fileUrl;
		await this.companyRepository.save(company);

		return { logo: company.logo };
	}

	private async assignEmployeeToCompany(
		transactionalEntityManager: EntityManager,
		employee: CreateCompanyEmployeesDto,
		company: Company,
	): Promise<void> {
		const role = await this.rolesRepository.findOne({
			where: { id: employee.roleId },
		});

		if (!role) {
			throw new Error(`Role with ID ${employee.roleId} not found`);
		}

		const result = await this.userService.create(
			transactionalEntityManager,
			company,
			role,
			employee.email,
		);

		this.mailService.sendRegistrationMail(
			employee.email,
			company.name,
			`${this.configService.getOrThrow("APP_URL")}/?email=${employee.email}&userId=${result.id}&companyId=${result.company.id}&rt=${result.registrationToken}`,
		);
	}
}
