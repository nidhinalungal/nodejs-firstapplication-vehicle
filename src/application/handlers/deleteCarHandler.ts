import { inject, injectable } from "inversify";
import { ICarService } from "../services/car/interface/ICarService";
import { TYPES } from "../utilities/types";
import { IRequestHandler } from "./interfaces/IRequestHandler";

@injectable()
export class DeleteCarHandler implements IRequestHandler<Boolean, string|number> {
  constructor(@inject(TYPES.ICarService) private carService: ICarService) {}

  public async handle(id: string | number): Promise<Boolean> {
    const parsedId = typeof id === "string" ? parseInt(id, 10) : id;
    if (isNaN(parsedId)) {
      return await this.carService.deleteCar(id as string);
    } else {
      return await this.carService.deleteCar(parsedId);
    }
  }
}
