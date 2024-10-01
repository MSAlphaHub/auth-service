interface IConfig {
  DB_HOST: string;
  DB_PORT: string;
  DB_USER: string;
  DB_NAME: string;
  DB_PASSWORD: string;
}

const config: IConfig = {
  DB_HOST: "localhost",
  DB_PORT: "5432",
  DB_USER: "postgres",
  DB_NAME: "postgres",
  DB_PASSWORD: "password",
};

export default config;
