import { Container, ContainerModule } from "inversify";
import { CarDataBaseService } from "./application/services/car/carDataBaseService";
import { ICarService } from "./application/services/car/interface/ICarService";
import { TYPES } from "./application/utilities/types";
import { ICarRepository } from "./infrastructure/abstract_repos/ICarRepository ";
import { CarOrmRepository } from "./infrastructure/data_access/orm_repository/carOrmRepository";
import { GetCarsHandler } from "./application/handlers/getCarsHandler"; // import only after CarDataBaseService
import { AddCarHandler } from "./application/handlers/addCarHandler";
import { GetCarByIdHandler } from "./application/handlers/getCarByIdHandler";
import { DeleteCarHandler } from "./application/handlers/deleteCarHandler";
import { UpdateCarHandler } from "./application/handlers/updateCarHandler";
import { Mediator } from "./application/utilities/mediator/mediator";
import { IMediator } from "./application/utilities/mediator/IMediator";
import { UploadImageHandler } from "./application/handlers/uploadImageHandler";
import { ICarProps } from "./application/handlers/dtos/ICarProps";
import { IUserService } from "./application/services/user/IUserService";
import { UserService } from "./application/services/user/userService";
import { IUserRepository } from "./infrastructure/abstract_repos/IUserRepository";
import { UserOrmRepository } from "./infrastructure/data_access/orm_repository/userOrmRepository";
import { CarsCronJobService } from "./application/services/cron_jobs/carsCronJobService";

const container = new Container();
container.bind<ICarService>(TYPES.ICarService).to(CarDataBaseService).inSingletonScope();

export default container;