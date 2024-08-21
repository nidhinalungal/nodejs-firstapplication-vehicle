import { MigrationInterface, QueryRunner } from "typeorm";

export class UserCarRelation1721386023637 implements MigrationInterface {
    name = 'UserCarRelation1721386023637'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cars\` ADD \`userId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`cars\` ADD CONSTRAINT \`FK_6431b6fec12c4090bb357fba2c2\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cars\` DROP FOREIGN KEY \`FK_6431b6fec12c4090bb357fba2c2\``);
        await queryRunner.query(`ALTER TABLE \`cars\` DROP COLUMN \`userId\``);
    }

}
