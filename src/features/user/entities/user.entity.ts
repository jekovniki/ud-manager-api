import { Company } from "src/features/company/entities/company.entity";
import { Role } from "src/features/role/entities/role.entity";
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
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

	constructor(user: Partial<User>) {
		Object.assign(this, user);
	}
}
