import { Injectable } from "@nestjs/common";
import { CreateObligationDto } from "./dto/create-obligation.dto";
import { Obligation } from "./entities/obligation.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";
import { ObligationStatus } from "./utils/enum.utils";

@Injectable()
export class ObligationService {
	constructor(
		@InjectRepository(Obligation)
		private readonly obligationRepository: Repository<Obligation>,
		private readonly entityManager: EntityManager,
	) {}

	public async create(createObligationDto: CreateObligationDto): Promise<Obligation> {
		const obligation = this.obligationRepository.create(createObligationDto);

		return await this.entityManager.save(Obligation, obligation);
	}

	public async findAllCompanyObligations(companyId: string): Promise<Obligation[]> {
		return await this.obligationRepository.findBy({
			companyId,
		});
	}

	public async findOneById(id: string): Promise<Obligation> {
		return await this.obligationRepository.findOneBy({
			id,
		});
	}

	public async findAllFundObligations(fundId: string): Promise<Obligation[]> {
		return await this.obligationRepository.findBy({
			fundId,
		});
	}

	public async findAllIncomingCompanyObligations(companyId: string): Promise<Obligation[]> {
		return await this.obligationRepository.findBy({
			companyId,
			status: ObligationStatus.PENDING,
		});
	}

	public async findAllIncomingFundObligations(fundId: string): Promise<Obligation[]> {
		return await this.obligationRepository.findBy({
			fundId,
			status: ObligationStatus.PENDING,
		});
	}

	public async remove(id: string): Promise<void> {
		await this.obligationRepository.delete({ id });
	}
}
