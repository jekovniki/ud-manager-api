import { BadRequestException, Injectable } from "@nestjs/common";
import {
	CreateCompanyDto,
	CreateCompanyEmployeesDto,
} from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";
import { EntityManager, Repository } from "typeorm";
import { Company } from "./entities/company.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/features/user/entities/user.entity";
import { Role } from "src/features/role/entities/role.entity";
import { BadRequestError } from "@uploadthing/shared";
import { FileManagerService } from "src/configuration/file-manager/file-manager.service";

@Injectable()
export class CompanyService {
	constructor(
		private readonly fileManagerService: FileManagerService,
		@InjectRepository(Company)
		private readonly companyRepository: Repository<Company>,
		@InjectRepository(Role)
		private readonly rolesRepository: Repository<Role>,
		private readonly entityManager: EntityManager,
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

		await transactionalEntityManager.save(
			new User({
				email: employee.email,
				password: "",
				firstName: "",
				lastName: "",
				role: role,
				position: "",
				refresh_token: "",
				company: company,
			}),
		);
	}

	async findAll() {
		return this.companyRepository.find();
	}

	async findOne(id: string) {
		return this.companyRepository.findOneBy({ id });
	}

	async update(id: string, updateCompanyDto: UpdateCompanyDto) {
		const company = await this.companyRepository.findOneBy({ id });
		company.name = updateCompanyDto.name;
		await this.entityManager.save(company);
		return `This action updates a #${id} company`;
	}

	async remove(id: string) {
		await this.companyRepository.delete(id);
	}

	async saveLogo(id: string, logo: Express.Multer.File) {
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
}
