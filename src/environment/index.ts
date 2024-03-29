import * as dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 4000;
export const SWAGGER_PATH = process.env.SWAGGER_PATH || 'docs';
export const API_PREFIX = process.env.API_PREFIX || 'api';
export const VERSION = process.env.VERSION || '0.1';
export const DB_HOST = process.env.DB_HOST || 'localhost';
export const DB_PORT = process.env.DB_PORT || 5432;
export const DB_USERNAME = process.env.DB_USERNAME || 'postgres';
export const DB_PASSWORD = process.env.DB_PASSWORD || 'postgres';
export const DB_NAME = process.env.DB_NAME || 'postgres';
export const JWT_SECRET = process.env.JWT_SECRET || 'secret';
export const JWT_EXPIRATION_TIME = process.env.JWT_EXPIRATION_TIME || '1d';
export const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
export const MAIL_HOST = process.env.MAIL_HOST || 'smtp.gmail.com';
export const MAIL_PORT = process.env.MAIL_PORT || '587';
export const MAIL_ADDRESS = process.env.MAIL_ADDRESS;
export const MAIL_PASSWORD = process.env.MAIL_PASSWORD;
export const MAIL_FROM = process.env.MAIL_FROM;
export const KEY = process.env.KEY || 'key';
export const IV = process.env.IV || 'iv';
export const APP_URL = process.env.APP_URL || 'http://localhost:3000';
