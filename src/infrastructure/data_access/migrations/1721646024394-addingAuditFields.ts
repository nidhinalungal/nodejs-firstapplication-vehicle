import { MigrationInterface, QueryRunner } from "typeorm";

export class AddingAuditFields1721646024394 implements MigrationInterface {
    name = 'AddingAuditFields1721646024394'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`owners\` (\`uuid\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`age\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`cars\` ADD \`createdBy\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`cars\` ADD \`createdAt\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`cars\` ADD \`updatedBy\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`cars\` ADD \`updatedAt\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cars\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`cars\` DROP COLUMN \`updatedBy\``);
        await queryRunner.query(`ALTER TABLE \`cars\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`cars\` DROP COLUMN \`createdBy\``);
        await queryRunner.query(`DROP TABLE \`owners\``);
    }

}
