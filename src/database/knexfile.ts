import config from '../config';

export default {
  development: {
    client: "pg",
    connection: {
      host: config.database.host,
      user: config.database.user,
      password: config.database.password,
      database: config.database.name,
      port: config.database.port,
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