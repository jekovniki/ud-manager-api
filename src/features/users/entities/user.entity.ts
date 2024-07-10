import { Company } from "src/features/company/entities/company.entity";
import { Roles } from "src/features/roles/entities/roles.entity";
import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
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

	@ManyToOne(() => Roles, { cascade: true })
	@JoinColumn({ name: "roleId" })
	role: Roles;

	@ManyToOne(() => Company)
	@JoinColumn({ name: "companyId" })
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
