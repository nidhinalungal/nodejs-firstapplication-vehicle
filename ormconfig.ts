import { DataSource, DataSourceOptions } from "typeorm";

export const connectionSource = new DataSource({
  migrationsTableName: "migrations",
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  //   driver: require("mysql2"),
  password: "department",
  database: "newdb",
  logging: true,
  synchronize: false,
  entities: ["src/infrastructure/models/*.ts"],
  migrations: ["src/infrastructure/data_access/migrations/*.ts"],
} as DataSourceOptions);
