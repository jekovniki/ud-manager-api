import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Roles {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ unique: true })
	name: string;

	constructor(roles: Partial<Roles>) {
		Object.assign(this, roles);
	}
}
