import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Company {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column()
	name: string;

	@Column()
	uic: string;

	@Column()
	logo: string;

	@Column({
		type: "timestamptz",
		default: new Date(),
	})
	createdAt: Date;

	@Column({
		type: "timestamptz",
		default: new Date(),
	})
	updatedAt: Date;

	constructor(company: Partial<Company>) {
		Object.assign(this, company);
	}
}
