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

export const container = new Container();
export const referenceDataIoCModule = () =>
  new ContainerModule((bind) => {
    bind<ICarService>(TYPES.ICarService)
      .to(CarDataBaseService)
      .inSingletonScope();
    bind<ICarRepository>(TYPES.ICarRepository).to(CarOrmRepository)
      .inSingletonScope;
    bind<GetCarsHandler>(TYPES.GetCarsHandler).to(GetCarsHandler)
      .inTransientScope;
    bind<GetCarByIdHandler>(TYPES.GetCarByIdHandler).to(GetCarByIdHandler)
      .inTransientScope;
    bind<AddCarHandler>(TYPES.AddCarHandler).to(AddCarHandler).inTransientScope;
    bind<DeleteCarHandler>(TYPES.DeleteCarHandler).to(DeleteCarHandler)
      .inTransientScope;
    bind<UpdateCarHandler>(TYPES.UpdateCarHandler).to(UpdateCarHandler)
      .inTransientScope;
    bind<UploadImageHandler>(TYPES.UploadImageHandler).to(UploadImageHandler)
      .inTransientScope;

    const mediator = new Mediator(
      <T>(serviceIdentifier: string | symbol): T => {
        return container.get<T>(serviceIdentifier);
      }
    );
    bind<IMediator<ICarProps | undefined | null>>(
      TYPES.IMediator
    ).toConstantValue(mediator);

    //Users
    bind<IUserService>(TYPES.IUserService).to(UserService).inSingletonScope();
    bind<IUserRepository>(TYPES.IUserRepository).to(UserOrmRepository)
      .inSingletonScope;

    //Cron
    bind<CarsCronJobService>(TYPES.CarsCronJobService).to(CarsCronJobService).inSingletonScope();

  });
