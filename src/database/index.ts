import knex, { Knex } from 'knex';
import config from '../config';

interface IDatabase {
    connection: Knex;
    getConnection(): Knex;
}

class Database implements IDatabase {
    private static instance: Database;
    public connection: Knex;

    private constructor() {
        this.connection = knex({
					client: 'pg',
					connection: {
							host: config.DB_HOST,
							user: config.DB_USER,
							password: config.DB_PASSWORD,
							database: config.DB_NAME,
							port: config.DB_PORT,
					},
			});
            console.log(`Connect database ${config.DB_NAME} at ${config.DB_HOST}:${config.DB_PORT}`)
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
