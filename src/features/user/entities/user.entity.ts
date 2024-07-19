import { Company } from "src/features/company/entities/company.entity";
import { Role } from "src/features/role/entities/role.entity";
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

	@Column({ name: "first_name" })
	firstName: string;

	@Column({ name: "last_name" })
	lastName: string;

	@Column()
	position: string;

	@Column({ name: "refresh_token" })
	refreshToken: string;

	@ManyToOne(() => Role, { cascade: true })
	@JoinColumn({ name: "role_id" })
	role: Role;

	@ManyToOne(() => Company)
	@JoinColumn({ name: "company_id" })
	company: Company;

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

	constructor(user: Partial<User>) {
		Object.assign(this, user);
	}
}
