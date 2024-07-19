import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

	@Column({
		type: "timestamptz",
		default: new Date(),
		name: "created_at",
	})
	createdAt: Date;

	@Column({
		type: "timestamptz",
		default: new Date(),
		name: "updated_at",
	})
	updatedAt: Date;

	constructor(company: Partial<Company>) {
		Object.assign(this, company);
	}
}
