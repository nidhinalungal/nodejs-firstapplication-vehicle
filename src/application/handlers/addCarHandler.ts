import { inject, injectable } from "inversify";
import { TYPES } from "../utilities/types";
import { ICarProps } from "./dtos/ICarProps";
import { ICarService } from "../services/car/interface/ICarService";
import { IRequestHandler } from "./interfaces/IRequestHandler";

@injectable()
export class AddCarHandler
  implements IRequestHandler<ICarProps | undefined | null, ICarProps>
{
  constructor(@inject(TYPES.ICarService) private carService: ICarService) {}
  public async handle(
    carProps: ICarProps
  ): Promise<ICarProps | null | undefined> {
    console.log("Received body data:", carProps);
    const car = await this.carService.saveCar(carProps);
    return this.carService.toICarProps(car);
  }
}
