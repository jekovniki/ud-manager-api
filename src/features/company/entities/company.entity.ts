import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";

@Entity()
export class Company {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ unique: true })
	name: string;

	@Column({ unique: true })
	uic: string;

	@Column()
	logo: string;

	@Column({
		type: "boolean",
		default: true,
	})
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

	constructor(company: Partial<Company>) {
		Object.assign(this, company);
	}
}
