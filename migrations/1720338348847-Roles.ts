import { Logger } from "@nestjs/common";
import { MigrationInterface, QueryRunner } from "typeorm";

export class Roles1720338348847 implements MigrationInterface {
	private readonly logger = new Logger(Roles1720338348847.name);

	public async up(queryRunner: QueryRunner): Promise<void> {
		this.logger.log("UP - START");
		await queryRunner.query(
			`INSERT INTO roles (name) VALUES ('Administrator')`,
		);
		await queryRunner.query(`INSERT INTO roles (name) VALUES ('Employee')`);
		this.logger.log("UP - COMPLETED");
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		this.logger.log("DOWN - START");
		await queryRunner.query(`DELETE FROM roles WHERE name = 'Administrator'`);
		await queryRunner.query(`DELETE FROM roles WHERE name = 'Employee'`);
		this.logger.log("DOWN - COMPLETED");
	}
}
