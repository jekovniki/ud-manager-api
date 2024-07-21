import { Injectable } from "@nestjs/common";
import { CreateFundDto } from "./dto/create-fund.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Fund } from "./entities/fund.entity";
import { DeleteResult, EntityManager, Repository } from "typeorm";

@Injectable()
export class FundService {
	constructor(
		@InjectRepository(Fund) private readonly fundRepository: Repository<Fund>,
		private readonly entityManager: EntityManager,
	) {}

	public async create(fund: CreateFundDto): Promise<Fund> {
		const data = this.fundRepository.create({ ...fund, active: true });

		return await this.entityManager.save(Fund, data);
	}

	public async findAllCompanyFunds(companyId: string): Promise<Fund[]> {
		return this.fundRepository.find({
			where: {
				companyId,
			},
		});
	}

	public async findOne(id: string): Promise<Fund> {
		return this.fundRepository.findOne({
			where: { id },
		});
	}

	public async remove(id: string): Promise<DeleteResult> {
		return this.fundRepository.delete({
			id,
		});
	}
}
