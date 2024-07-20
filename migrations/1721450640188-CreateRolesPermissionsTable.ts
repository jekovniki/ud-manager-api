import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { Logger } from "@nestjs/common";

export class CreateRolesPermissionsTable1721450640188
	implements MigrationInterface
{
	private readonly logger = new Logger(
		CreateRolesPermissionsTable1721450640188.name,
	);

	public async up(queryRunner: QueryRunner): Promise<void> {
		this.logger.log("UP - START");
		await queryRunner.createTable(
			new Table({
				name: "role_permission",
				columns: [
					{
						name: "id",
						type: "int",
						isPrimary: true,
						isGenerated: true,
						generationStrategy: "increment",
					},
					{
						name: "role_id",
						type: "int",
					},
					{
						name: "permission_id",
						type: "int",
					},
				],
			}),
			true,
		);
		this.logger.log("UP - COMPLETED");
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		this.logger.log("DOWN - START");
		await queryRunner.dropTable("role_permission");
		this.logger.log("DOWN - COMPLETED");
	}
}
