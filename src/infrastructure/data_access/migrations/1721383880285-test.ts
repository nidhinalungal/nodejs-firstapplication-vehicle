import { MigrationInterface, QueryRunner } from "typeorm";

export class Test1721383880285 implements MigrationInterface {
    name = 'Test1721383880285'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`dob\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`dob\``);
    }

}
