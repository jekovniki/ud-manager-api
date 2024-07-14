import { Logger } from "@nestjs/common";
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCompanyTable1720599676088 implements MigrationInterface {
	private readonly logger = new Logger(CreateCompanyTable1720599676088.name);

	public async up(queryRunner: QueryRunner): Promise<void> {
		this.logger.log("UP - START");

		await queryRunner.createTable(
			new Table({
				name: "company",
				columns: [
					{
						name: "id",
						type: "uuid",
						isPrimary: true,
						generationStrategy: "uuid",
						default: "uuid_generate_v4()",
					},
					{
						name: "name",
						type: "varchar",
						isUnique: true,
					},
					{
						name: "uic",
						type: "varchar",
						isUnique: true,
					},
					{
						name: "logo",
						type: "varchar",
					},
					{
						name: "active",
						type: "boolean",
						default: true,
					},
					{
						name: "created_at",
						type: "timestamptz",
						default: "now()",
					},
					{
						name: "updated_at",
						type: "timestamptz",
						default: "now()",
					},
				],
			}),
			true,
		);
		this.logger.log("UP - COMPLETED");
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		this.logger.log("DOWN - START");
		await queryRunner.dropTable("company");
		this.logger.log("DOWN - COMPLETED");
	}
}
