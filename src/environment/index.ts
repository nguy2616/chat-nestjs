import * as dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 4000;
export const SWAGGER_PATH = process.env.SWAGGER_PATH || 'docs';
export const API_PREFIX = process.env.API_PREFIX || 'api';
export const VERSION = process.env.VERSION || '0.1';
