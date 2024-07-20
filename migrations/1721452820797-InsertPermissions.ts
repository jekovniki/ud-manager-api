import { Logger } from "@nestjs/common";
import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertPermissions1721452820797 implements MigrationInterface {
	private readonly logger = new Logger(InsertPermissions1721452820797.name);

	public async up(queryRunner: QueryRunner): Promise<void> {
		this.logger.log("UP - START");
		// user permissions
		await queryRunner.query(
			`INSERT INTO permission (feature, permission) VALUES ('user', 'READ');`,
		);
		await queryRunner.query(
			`INSERT INTO permission (feature, permission) VALUES ('user', 'UPDATE');`,
		);
		await queryRunner.query(
			`INSERT INTO permission (feature, permission) VALUES ('user', 'DELETE');`,
		);
		await queryRunner.query(
			`INSERT INTO permission (feature, permission) VALUES ('user', 'CREATE');`,
		);

		// company permissions
		await queryRunner.query(
			`INSERT INTO permission (feature, permission) VALUES ('company', 'READ');`,
		);
		await queryRunner.query(
			`INSERT INTO permission (feature, permission) VALUES ('company', 'UPDATE');`,
		);
		await queryRunner.query(
			`INSERT INTO permission (feature, permission) VALUES ('company', 'DELETE');`,
		);
		await queryRunner.query(
			`INSERT INTO permission (feature, permission) VALUES ('company', 'CREATE');`,
		);

		// fund permissions
		await queryRunner.query(
			`INSERT INTO permission (feature, permission) VALUES ('fund', 'READ');`,
		);
		await queryRunner.query(
			`INSERT INTO permission (feature, permission) VALUES ('fund', 'UPDATE');`,
		);
		await queryRunner.query(
			`INSERT INTO permission (feature, permission) VALUES ('fund', 'DELETE');`,
		);
		await queryRunner.query(
			`INSERT INTO permission (feature, permission) VALUES ('fund', 'CREATE');`,
		);

		// obligation permissions
		await queryRunner.query(
			`INSERT INTO permission (feature, permission) VALUES ('obligation', 'READ');`,
		);
		await queryRunner.query(
			`INSERT INTO permission (feature, permission) VALUES ('obligation', 'UPDATE');`,
		);
		await queryRunner.query(
			`INSERT INTO permission (feature, permission) VALUES ('obligation', 'DELETE');`,
		);
		await queryRunner.query(
			`INSERT INTO permission (feature, permission) VALUES ('obligation', 'CREATE');`,
		);

		// asset permissions
		await queryRunner.query(
			`INSERT INTO permission (feature, permission) VALUES ('asset', 'READ');`,
		);
		await queryRunner.query(
			`INSERT INTO permission (feature, permission) VALUES ('asset', 'UPDATE');`,
		);
		await queryRunner.query(
			`INSERT INTO permission (feature, permission) VALUES ('asset', 'DELETE');`,
		);
		await queryRunner.query(
			`INSERT INTO permission (feature, permission) VALUES ('asset', 'CREATE');`,
		);
		this.logger.log("UP - COMPLETED");
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		this.logger.log("DOWN - START");
		await queryRunner.query(`DELETE FROM permission`);
		this.logger.log("DOWN - COMPLETED");
	}
}
