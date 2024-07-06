import { Company } from "src/companies/entities/company.entity";
import {
	Column,
	Entity,
	JoinColumn,
	OneToOne,
	PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class User {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ unique: true })
	email: string;

	@Column()
	password: string;

	@Column()
	firstName: string;

	@Column()
	lastName: string;

	@Column()
	position: string;

	@Column()
	refresh_token: string;

	@OneToOne(() => Company, { cascade: true })
	@JoinColumn()
	company: Company;

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

	constructor(user: Partial<User>) {
		Object.assign(this, user);
	}
}
