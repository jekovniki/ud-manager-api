import { Logger } from "@nestjs/common";
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePermissionTable1720599761237 implements MigrationInterface {
	private readonly logger = new Logger(CreatePermissionTable1720599761237.name);

	public async up(queryRunner: QueryRunner): Promise<void> {
		this.logger.log("UP - START");
		await queryRunner.createTable(
			new Table({
				name: "permissions",
				columns: [
					{
						name: "id",
						type: "int",
						isPrimary: true,
						isGenerated: true,
						generationStrategy: "increment",
					},
					{
						name: "name",
						type: "varchar",
						isUnique: true,
					},
				],
			}),
			true,
		);
		this.logger.log("UP - COMPLETED");
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		this.logger.log("DOWN - START");
		await queryRunner.dropTable("permissions");
		this.logger.log("DOWN - COMPLETED");
	}
}
