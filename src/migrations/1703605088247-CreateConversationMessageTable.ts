import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateConversationMessageTable1703605088247 implements MigrationInterface {
    name = 'CreateConversationMessageTable1703605088247'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "messages" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" integer, "updated_by" integer, "deleted_at" TIMESTAMP, "status" boolean NOT NULL DEFAULT true, "content" text, "author_id" integer, "conversation_id" integer, "auhtor_id" integer, CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "conversations" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" integer, "updated_by" integer, "deleted_at" TIMESTAMP, "status" boolean NOT NULL DEFAULT true, "creator_id" integer NOT NULL, "recipent_id" integer NOT NULL, CONSTRAINT "PK_ee34f4f7ced4ec8681f26bf04ef" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "creator_recipent_unq" ON "conversations" ("creator_id", "recipent_id") `);
        await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "created_by"`);
        await queryRunner.query(`ALTER TABLE "roles" ADD "created_by" integer`);
        await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "updated_by"`);
        await queryRunner.query(`ALTER TABLE "roles" ADD "updated_by" integer`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "created_by"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "created_by" integer`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updated_by"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updated_by" integer`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_d9b5b282724eb9fa7cd92a7d40d" FOREIGN KEY ("auhtor_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_3bc55a7c3f9ed54b520bb5cfe23" FOREIGN KEY ("conversation_id") REFERENCES "conversations"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_3bc55a7c3f9ed54b520bb5cfe23"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_d9b5b282724eb9fa7cd92a7d40d"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updated_by"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updated_by" character varying`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "created_by"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "created_by" character varying`);
        await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "updated_by"`);
        await queryRunner.query(`ALTER TABLE "roles" ADD "updated_by" character varying`);
        await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "created_by"`);
        await queryRunner.query(`ALTER TABLE "roles" ADD "created_by" character varying`);
        await queryRunner.query(`DROP INDEX "public"."creator_recipent_unq"`);
        await queryRunner.query(`DROP TABLE "conversations"`);
        await queryRunner.query(`DROP TABLE "messages"`);
    }

}
