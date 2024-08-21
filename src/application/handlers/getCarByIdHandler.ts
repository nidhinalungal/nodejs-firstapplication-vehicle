import { inject, injectable } from "inversify";
import { TYPES } from "../utilities/types";
import { ICarProps } from "./dtos/ICarProps";
import { ICarService } from "../services/car/interface/ICarService";
import { IRequestHandler } from "./interfaces/IRequestHandler";

@injectable()
export class GetCarByIdHandler
  implements IRequestHandler<ICarProps | undefined | null, number>
{
  constructor(@inject(TYPES.ICarService) private carService: ICarService) {}

  public async handle(id: number): Promise<ICarProps | undefined | null> {
    if (isNaN(id)) {
      throw new Error(`Invalid Id: ${id}`);
    }
    const car = await this.carService.findCarById(id);
    if (car == null) {
      throw new Error(`Couldn't find Car with id: ${id}`);
    } else return this.carService.toICarProps(car);
  }
}
