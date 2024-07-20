import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

type PermissionType = "READ" | "WRITE" | "CREATE" | "UPDATE" | "DELETE";

@Entity("permission")
export class Permission {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ unique: true })
	feature: string;

	@Column({
		type: "enum",
		enum: ["READ", "WRITE", "CREATE", "DELETE", "UPDATE"],
	})
	permission: PermissionType;

	constructor(permission: Partial<Permission>) {
		Object.assign(this, permission);
	}
}
