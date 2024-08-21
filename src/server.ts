import express from "express";
import "reflect-metadata";
import { container } from "./inversify.config";
import { InversifyExpressServer } from "inversify-express-utils";
import "./application/controllers/carController";
import "./application/controllers/userController";
import { dataSource } from "./config/dataSource";
import { DataSource } from "typeorm";
import { TYPES } from "./application/utilities/types";
import multer from "multer";
import path from "path";
import { Request, Response } from "express";
import { upload } from "./config/multerConfig"; // Import the upload configuration
import { authenticateToken } from "./application/controllers/validators/authenticateToken";
import { authorizeRole } from "./application/controllers/validators/authorizeRole";
import { CarsCronJobService } from "./application/services/cron_jobs/carsCronJobService";

const port = process.env.PORT || 8000;

export async function bootstrap() {
  const server = new InversifyExpressServer(container);
  server.setConfig((app) => {
    app.use(express.json());
    app.use("/cars", authenticateToken, authorizeRole("Admin"));
  });
  const serverInstance = server.build();

  initiateDBconnection();
  serverInstance.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

  function initiateDBconnection() {
    try {
      dataSource.initialize();
      if (dataSource.isInitialized) {
        console.info("connected to the database successfully");
      }
      container.bind<DataSource>(TYPES.DataSource).toConstantValue(dataSource);
    } catch (error) {
      console.error("Error connecting to the database", error);
    }
  }
}
