import { inject, injectable } from "inversify";
import { TYPES } from "../utilities/types";
import { ICarProps } from "./dtos/ICarProps";
import { ICarService } from "../services/car/interface/ICarService";
import { IRequestHandler } from "./interfaces/IRequestHandler";

@injectable()
export class UpdateCarHandler
  implements IRequestHandler<ICarProps | undefined, ICarProps>
{
  constructor(@inject(TYPES.ICarService) private carService: ICarService) {}

  public async handle(carProps: ICarProps): Promise<ICarProps | undefined> {
    if (isNaN(carProps.id)) {
      throw new Error(`Invalid Id: ${carProps.id}`);
    }
    const car = await this.carService.updateCar(carProps.id, carProps);
    const res =  this.carService.toICarProps(car);
    if (car == null) {
      throw new Error(`Couldn't find Car with id: ${carProps.id}`);
    } else return this.carService.toICarProps(car);
  }
}
