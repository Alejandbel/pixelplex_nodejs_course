import bcrypt from 'bcryptjs';
import { MigrationInterface, QueryRunner } from 'typeorm';

import { ADMIN_PASSWORD } from '@config';
import { USER_ROLES } from '@users';

import { HASH_CONSTANTS } from '../api/v1/auth/auth.constants';

export class admin1671827966997 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const adminName = 'admin';
    const adminEmail = 'admin@admin.com';
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, HASH_CONSTANTS.SALT_LENGTH);

    await queryRunner.query(`
        INSERT INTO "user" (name, password, email, "normalizedEmail", role)
        VALUES ('${adminName}', '${hashedPassword}', '${adminEmail}', '${adminEmail}', '${USER_ROLES.ADMIN}');
    `);

    console.log(`
    ##################################
    Admin has been successfully created
    
    username: ${adminName}
    email: ${adminEmail}
    password: ${ADMIN_PASSWORD}
    ##################################
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DELETE FROM "user"
        WHERE "normalizedEmail" = 'admin@admin.com'
    `);
  }
}
