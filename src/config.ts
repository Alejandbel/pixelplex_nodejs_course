import * as dotenv from 'dotenv';

dotenv.config();

export class DATASOURCE_CONFIG {
  static readonly PORT = Number(process.env.DB_PORT) ?? 5432;
  static readonly PASSWORD = process.env.DB_PASSWORD;
  static readonly HOST = process.env.DB_HOST ?? 'localhost';
  static readonly DATABASE = process.env.POSTGRES_DB ?? 'example_db';
  static readonly USERNAME = process.env.DB_USERNAME ?? 'postgres';
  static readonly TYPE = 'postgres';
  static readonly LOGGING = false;
  static readonly SYNCHRONIZE = true;
}

export class APPLICATION_CONFIG {
  static readonly PORT = Number(process.env.APPLICATION_PORT) ?? 8000;
}

export const JWT_SECRET = process.env.JWT_SECRET ?? 'SECRET_TOKEN';
