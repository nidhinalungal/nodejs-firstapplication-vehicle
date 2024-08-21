import { MigrationInterface, QueryRunner } from "typeorm";

export class DateInAuditFields1721720389948 implements MigrationInterface {
    name = 'DateInAuditFields1721720389948'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cars\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`cars\` ADD \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`cars\` CHANGE \`updatedBy\` \`updatedBy\` varchar(255) NULL DEFAULT 'system'`);
        await queryRunner.query(`ALTER TABLE \`cars\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`cars\` ADD \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cars\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`cars\` ADD \`updatedAt\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`cars\` CHANGE \`updatedBy\` \`updatedBy\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`cars\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`cars\` ADD \`createdAt\` varchar(255) NOT NULL`);
    }

}
