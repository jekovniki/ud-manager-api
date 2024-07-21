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

@Entity("fund")
export class Fund {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ unique: true })
	name: string;

	@Column()
	description: string;

	@Column({ unique: true })
	bullstat: string;

	@Column("uuid")
	@Index("IDX_FUND_COMPANY_ID")
	company_id: string;

	@ManyToOne(() => Company)
	@JoinColumn({ name: "company_id" })
	company: Company;

	@Column({ default: true })
	active: boolean;

	@CreateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
	created_at: Date;

	@UpdateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
	updated_at: Date;
}
