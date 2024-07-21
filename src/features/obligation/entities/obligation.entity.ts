import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	JoinColumn,
	Index,
	CreateDateColumn,
	UpdateDateColumn,
} from "typeorm";
import { Company } from "../../company/entities/company.entity";
import { Fund } from "../../fund/entities/fund.entity";
import { ObligationStatus } from "../utils/enum.utils";

@Entity("obligation")
export class Obligation {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column()
	name: string;

	@Column()
	description: string;

	@Column({ name: "fund_id", nullable: true })
	@Index("IDX_OBLIGATION_FUND_ID")
	fundId: string | null;

	@ManyToOne(() => Fund, { nullable: true })
	@JoinColumn({ name: "fund_id" })
	fund: Fund | null;

	@Column({ name: "company_id" })
	@Index("IDX_OBLIGATION_COMPANY_ID")
	companyId: string;

	@ManyToOne(() => Company)
	@JoinColumn({ name: "company_id" })
	company: Company;

	@Column({
		type: "enum",
		enum: ObligationStatus,
	})
	status: ObligationStatus;

	@Column({ name: "due_date", type: "timestamptz" })
	dueDate: Date;

	@CreateDateColumn({ name: "created_at", type: "timestamptz" })
	createdAt: Date;

	@UpdateDateColumn({ name: "updated_at", type: "timestamptz" })
	updatedAt: Date;
}
