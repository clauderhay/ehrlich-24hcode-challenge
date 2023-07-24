import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1690171826398 implements MigrationInterface {
    name = 'Migration1690171826398'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`password\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`password\``);
    }

}
