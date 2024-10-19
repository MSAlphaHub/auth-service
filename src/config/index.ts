import dotenv from "dotenv";
import { EnumEnvironment } from "../constants/enums";
// Load .env file
dotenv.config();

interface IConfig {
  DB_HOST: string;
  DB_PORT: number;
  DB_USER: string;
  DB_NAME: string;
  DB_PASSWORD: string;
  ENV: string | EnumEnvironment;
  PORT: number;
}

function getEnvVar(key: string, defaultValue?: string): string {
  const value = process.env[key] || defaultValue;
  if (!value) {
    throw new Error(`Environment variable ${key} is missing`);
  }
  return value;
}

const config: IConfig = {
  DB_HOST: getEnvVar("DB_HOST"),
  DB_PORT: Number(process.env.DB_PORT) || 5432,
  DB_USER: getEnvVar("DB_USER"),
  DB_NAME: getEnvVar("DB_NAME"),
  DB_PASSWORD: getEnvVar("DB_PASSWORD"),
  ENV: process.env.ENV || EnumEnvironment.DEVELOPMENT,
  PORT: Number(process.env.PORT) || 3000,
};

export default config;
