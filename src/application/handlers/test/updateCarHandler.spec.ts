import "reflect-metadata";
import mocha from "mocha";
import * as sinon from "ts-sinon";
import { UpdateCarHandler } from "../updateCarHandler";
import { ICarService } from "../../services/car/interface/ICarService";
import chai from "chai";
import { Car } from "../../../domain/car";
import { ICarProps } from "../dtos/ICarProps";
import container from "../../../inversify.test.config";
import { ContainerModule } from "inversify";
import { interfaces } from "inversify";
import { CarDataBaseService } from "../../services/car/carDataBaseService";
import { TYPES } from "../../utilities/types";

mocha.describe("UpdateCarHandler", () => {
  // it("Invalid Id Test", async () => {
  //   const service: ICarService = sinon.stubInterface<ICarService>();
  //   const handler = new UpdateCarHandler(service);
  //   const response = await handler.handle({
  //     id: "id",
  //     brand: "SuzukiUpdated",
  //     model: "SwiftUpdate",
  //     year: "2022",
  //     seatCapacity: 10,
  //     regNo: "AB12CD1234",
  //     user: {
  //       id: "string",
  //       name: "string",
  //       username: "string",
  //       password: "string",
  //       role: "string",
  //     },
  //   });
  //   chai.expect(response).throw("Invalid Id: id");
  // });

  it("Valid Id Test, db returning NULL", async () => {
    container.unload();
    container.load(
      new ContainerModule((bind: interfaces.Bind) => {
        container
          .bind<ICarService>(TYPES.ICarService)
          .to(CarDataBaseService)
          .inSingletonScope();
      })
    );
    const service = sinon.stubInterface<ICarService>();
    const handler = new UpdateCarHandler(service);
    const carProps: ICarProps = {
      id: 1,
      brand: "SuzukiUpdated",
      model: "SwiftUpdate",
      year: "2022",
      seatCapacity: 10,
      regNo: "AB12CD1234",
      user: {
        id: "string",
        name: "string",
        username: "string",
        password: "string",
        role: "string",
      },
    };
    service.updateCar.returns(Promise.resolve(Car.create(carProps)));

    const response = await handler.handle(carProps);
    console.log("response", carProps);
    console.log("response", response); // service.updateCar = async (id, carProps) => {
    //   return Car.create(carProps);
    // }

    // async fuction (, carProps) {

    // };
    // service.updateCar = async function () : Promise<Car|null> {
    //         return Promise.resolve(null);
    // }
    // chai.expect(response).throw("Couldn't find Car with id: 1");
    chai.expect(response?.id).equals(1);
  });
});
