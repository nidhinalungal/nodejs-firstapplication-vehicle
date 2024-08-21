import { DataSource } from "typeorm";
import mysqlConfig from "./mysql-config.json";
import { CarEntity } from "../infrastructure/models/CarEntity";
import { OwnerEntity } from "../infrastructure/models/OwnerEntity";
import { UserEntity } from "../infrastructure/models/UserEntity";

export const dataSource = new DataSource({
  type: "mysql",
  host: mysqlConfig.host,
  port: mysqlConfig.port,
  username: mysqlConfig.username,
  password: mysqlConfig.password,
  database: mysqlConfig.database,
  entities: [CarEntity, UserEntity],
  synchronize: false,
  logging: true,
  migrations: ["src/infrastructure/data_access/migrations/*.ts"],
});
