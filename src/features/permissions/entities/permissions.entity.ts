import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Permissions {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ unique: true })
	name: string;

	constructor(permission: Partial<Permissions>) {
		Object.assign(this, permission);
	}
}
