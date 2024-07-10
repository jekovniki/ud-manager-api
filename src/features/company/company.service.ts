import { Injectable } from "@nestjs/common";
import {
	CreateCompanyDto,
	CreateCompanyEmployeesDto,
} from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";
import { EntityManager, Repository } from "typeorm";
import { Company } from "./entities/company.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/features/users/entities/user.entity";
import { Roles } from "src/features/roles/entities/roles.entity";

@Injectable()
export class CompanyService {
	constructor(
		@InjectRepository(Company)
		private readonly companiesRepository: Repository<Company>,
		@InjectRepository(Roles)
		private readonly rolesRepository: Repository<Roles>,
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
		console.log("roleID : ", employee.roleId);
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
		return this.companiesRepository.find();
	}

	async findOne(id: string) {
		return this.companiesRepository.findOneBy({ id });
	}

	async update(id: string, updateCompanyDto: UpdateCompanyDto) {
		const company = await this.companiesRepository.findOneBy({ id });
		company.name = updateCompanyDto.name;
		await this.entityManager.save(company);
		return `This action updates a #${id} company`;
	}

	async remove(id: string) {
		await this.companiesRepository.delete(id);
	}
}
