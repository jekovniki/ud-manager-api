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

	@Column({ type: "uuid", name: "company_id" })
	@Index("IDX_FUND_COMPANY_ID")
	companyId: string;

	@ManyToOne(() => Company)
	@JoinColumn({ name: "company_id" })
	company: Company;

	@Column({ default: true })
	active: boolean;

	@CreateDateColumn({
		name: "created_at",
		type: "timestamptz",
		default: () => "CURRENT_TIMESTAMP",
	})
	createdAt: Date;

	@UpdateDateColumn({
		name: "updated_at",
		type: "timestamptz",
		default: () => "CURRENT_TIMESTAMP",
	})
	updatedAt: Date;
}
