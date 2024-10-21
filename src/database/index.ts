import knex, { Knex } from "knex";
import config from "../config";

interface IDatabase {
  connection: Knex;
  getConnection(): Knex;
}

class Database implements IDatabase {
  private static instance: Database;
  public connection: Knex;

  private constructor() {
    this.connection = knex({
      client: "pg",
      connection: {
        host: config.database.host,
        user: config.database.user,
        password: config.database.password,
        database: config.database.name,
        port: config.database.port,
      },
    });
    console.log(
      `Connect database ${config.database.name} at ${config.database.host}:${config.database.port}`
    );
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }

  public getConnection(): Knex {
    return this.connection;
  }
}

const instance = Database.getInstance();
Object.freeze(instance);

export default instance;
