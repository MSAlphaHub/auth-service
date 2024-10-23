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

    // check connection is established
    this.connection
      .raw("SELECT 1")
      .then(() => {
        console.log(
          `Connected to database ${config.database.name} at ${config.database.host}:${config.database.port}`
        );
      })
      .catch((error) => {
        console.error("Unable to connect to the database:", error.message);
        throw new Error(
          "Database connection failed. Please check the configuration and database."
        );
      });
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
