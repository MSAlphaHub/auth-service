import config from '../config';

export default {
  development: {
    client: "pg",
    connection: {
      host: config.DB_HOST,
      user: config.DB_USER,
      password: config.DB_PASSWORD,
      database: config.DB_NAME,
      port: config.DB_PORT,
    },
    migrations: {
      directory: "./migrations",
      tableName: 'migrations',
    },
    seeds: {
      directory: "./seeds",
    },
  },
};