import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("role")
export class Role {
	@PrimaryGeneratedColumn("increment")
	id: number;

	@Column({ unique: true })
	name: string;

	constructor(roles: Partial<Role>) {
		Object.assign(this, roles);
	}
}
