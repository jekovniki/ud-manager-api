import { Logger } from "@nestjs/common";
import {
	MigrationInterface,
	QueryRunner,
	Table,
	TableForeignKey,
	TableIndex,
} from "typeorm";

export class CreateFundTable1721535247479 implements MigrationInterface {
	private readonly logger = new Logger(CreateFundTable1721535247479.name);

	public async up(queryRunner: QueryRunner): Promise<void> {
		this.logger.log("UP - START");
		await queryRunner.createTable(
			new Table({
				name: "fund",
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
						name: "description",
						type: "varchar",
					},
					{
						name: "bullstat",
						type: "varchar",
						isUnique: true,
					},
					{
						name: "company_id",
						type: "uuid",
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

		await queryRunner.createForeignKeys("fund", [
			new TableForeignKey({
				columnNames: ["company_id"],
				referencedColumnNames: ["id"],
				referencedTableName: "company",
			}),
		]);

		await queryRunner.createIndex(
			"fund",
			new TableIndex({
				name: "IDX_FUND_COMPANY_ID",
				columnNames: ["company_id"],
			}),
		);

		this.logger.log("UP - COMPLETED");
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		this.logger.log("DOWN - START");
		await queryRunner.dropTable("fund");
		this.logger.log("DOWN - COMPLETED");
	}
}
