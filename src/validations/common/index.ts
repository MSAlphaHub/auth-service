import Joi from "joi";
import { EnumEnvironment } from "../../constants/enums";

const env = Joi.object()
  .keys({
    ENV: Joi.string().valid("DEVELOPMENT", "PRODUCTION").required(),
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().required(),
    DB_USER: Joi.string().required(),
    DB_NAME: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    PORT: Joi.number().default(3000),
    HOST: Joi.string().default("http://localhost:3000/api"),
    JWT_SECRET: Joi.string().required().description("JWT secret key"),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number()
      .default(30)
      .description("minutes after which access tokens expire"),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number()
      .default(30)
      .description("days after which refresh tokens expire"),
    JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number()
      .default(30)
      .description("minutes after which verify email token expires"),
    SMTP_HOST: Joi.string().description("server that will send the emails"),
    SMTP_PORT: Joi.number().description("port to connect to the email server"),
    SMTP_USERNAME: Joi.string().description("username for email server"),
    SMTP_PASSWORD: Joi.string().description("password for email server"),
    EMAIL_FROM: Joi.string().description(
      "the from field in the emails sent by the app"
    ),
    EMAIL_QUEUE_ADDRESS: Joi.string().description(
      "the queues's address connect to rabbitMQ Email service"
    ),
  })
  .unknown();

interface IEnv {
  DB_HOST: string;
  DB_PORT: number;
  DB_USER: string;
  DB_NAME: string;
  DB_PASSWORD: string;
  ENV: EnumEnvironment;
  PORT: number;
  HOST: string;
  JWT_SECRET: string;
  JWT_ACCESS_EXPIRATION_MINUTES: number;
  JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: number;
  JWT_REFRESH_EXPIRATION_DAYS: number;
  EMAIL_QUEUE_ADDRESS: string;
}

export const validateEnv = (): IEnv => {
  const { value: envVars, error } = env
    .prefs({ errors: { label: "key" } })
    .validate(process.env);

  if (error) {
    throw new Error(`Config validation error: ${error.message}`);
  }
  return envVars;
};

export const password = (value: string, helpers: Joi.CustomHelpers) => {
  if (value.length < 8) {
    return helpers.error("any.min", { limit: 8 });
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.error("string.pattern.base", {
      name: "password",
      pattern: "at least 1 letter and 1 number",
    });
  }
  return value;
};
