import { Logger } from "@nestjs/common";
import {
	MigrationInterface,
	QueryRunner,
	Table,
	TableForeignKey,
	TableIndex,
} from "typeorm";

export class CreateObligationTable1721541784607 implements MigrationInterface {
	private readonly logger = new Logger(CreateObligationTable1721541784607.name);

	public async up(queryRunner: QueryRunner): Promise<void> {
		this.logger.log("UP - START");
		await queryRunner.createTable(
			new Table({
				name: "obligation",
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
					},
					{
						name: "description",
						type: "varchar",
					},
					{
						name: "fund_id",
						type: "uuid",
						isNullable: true,
					},
					{
						name: "company_id",
						type: "uuid",
						isNullable: false,
					},
					{
						name: "status",
						type: "enum",
						enum: ["PENDING", "COMPLETED", "REJECTED"],
					},
					{
						name: "due_date",
						type: "timestamptz",
						isNullable: false,
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

		await queryRunner.createForeignKeys("obligation", [
			new TableForeignKey({
				columnNames: ["company_id"],
				referencedColumnNames: ["id"],
				referencedTableName: "company",
			}),
		]);

		await queryRunner.createForeignKeys("obligation", [
			new TableForeignKey({
				columnNames: ["fund_id"],
				referencedColumnNames: ["id"],
				referencedTableName: "fund",
			}),
		]);

		await queryRunner.createIndex(
			"obligation",
			new TableIndex({
				name: "IDX_OBLIGATION_COMPANY_ID",
				columnNames: ["company_id"],
			}),
		);

		await queryRunner.createIndex(
			"obligation",
			new TableIndex({
				name: "IDX_OBLIGATION_FUND_ID",
				columnNames: ["fund_id"],
			}),
		);

		this.logger.log("UP - COMPLETED");
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		this.logger.log("DOWN - START");
		await queryRunner.dropTable("obligation");
		this.logger.log("DOWN - COMPLETED");
	}
}
