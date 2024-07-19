import { Logger } from "@nestjs/common";
import {
	MigrationInterface,
	QueryRunner,
	Table,
	TableForeignKey,
} from "typeorm";

export class CreateUserTable1720599895236 implements MigrationInterface {
	private readonly logger = new Logger(CreateUserTable1720599895236.name);

	public async up(queryRunner: QueryRunner): Promise<void> {
		this.logger.log("UP - START");
		await queryRunner.createTable(
			new Table({
				name: "user",
				columns: [
					{
						name: "id",
						type: "uuid",
						isPrimary: true,
						generationStrategy: "uuid",
						default: "uuid_generate_v4()",
					},
					{
						name: "email",
						type: "varchar",
						isUnique: true,
					},
					{
						name: "password",
						type: "varchar",
					},
					{
						name: "first_name",
						type: "varchar",
					},
					{
						name: "last_name",
						type: "varchar",
					},
					{
						name: "position",
						type: "varchar",
					},
					{
						name: "refresh_token",
						type: "varchar",
					},
					{
						name: "role_id",
						type: "int",
					},
					{
						name: "company_id",
						type: "uuid",
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

		await queryRunner.createForeignKeys("user", [
			new TableForeignKey({
				columnNames: ["role_id"],
				referencedColumnNames: ["id"],
				referencedTableName: "roles",
				onDelete: "CASCADE",
			}),
			new TableForeignKey({
				columnNames: ["company_id"],
				referencedColumnNames: ["id"],
				referencedTableName: "company",
			}),
		]);
		this.logger.log("UP - COMPLETED");
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		this.logger.log("DOWN - START");
		await queryRunner.dropTable("user");
		this.logger.log("DOWN - COMPLETED");
	}
}
