import { Request } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "../utilities/types";
import { Car } from "../../domain/car";
import { ICarProps } from "./dtos/ICarProps";
import { ICarService } from "../services/car/interface/ICarService";
import { IRequestHandler } from "./interfaces/IRequestHandler";

@injectable()
export class GetCarsHandler implements IRequestHandler<(ICarProps | undefined)[], void>{
  constructor(@inject(TYPES.ICarService) private carService: ICarService) {}

  public async handle(): Promise<(ICarProps | undefined)[]> {
    const cars = await this.carService.getCars();
    const carPropss = cars.map((car: Car) => this.carService.toICarProps(car));
    console.log("CarDTOs:", carPropss);
    return carPropss;
  }
}
