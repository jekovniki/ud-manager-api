import { Logger } from "@nestjs/common";
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePermissionTable1720599761237 implements MigrationInterface {
	private readonly logger = new Logger(CreatePermissionTable1720599761237.name);

	public async up(queryRunner: QueryRunner): Promise<void> {
		this.logger.log("UP - START");
		await queryRunner.createTable(
			new Table({
				name: "permission",
				columns: [
					{
						name: "id",
						type: "int",
						isPrimary: true,
						isGenerated: true,
						generationStrategy: "increment",
					},
					{
						name: "feature",
						type: "varchar",
					},
					{
						name: "permission",
						type: "enum",
						enum: ["READ", "CREATE", "DELETE", "UPDATE"],
					},
				],
			}),
			true,
		);
		this.logger.log("UP - COMPLETED");
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		this.logger.log("DOWN - START");
		await queryRunner.dropTable("permission");
		this.logger.log("DOWN - COMPLETED");
	}
}
