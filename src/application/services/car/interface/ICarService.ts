import { Car } from "../../../../domain/car";
import { ICarProps } from "../../../handlers/dtos/ICarProps";
import { MulterRequest } from "../../../utilities/MulterRequest";

export interface ICarService {
  getCars(): Promise<Car[]>;
  findCarById(id: number): Promise<Car | null>;
  saveCar(carProps: ICarProps): Promise<Car>;
  updateCar(id: number, updateCar: ICarProps): Promise<Car | null>;
  deleteCar(id: number): Promise<boolean>;
  deleteCar(regNo: string): Promise<boolean>;
  toICarProps(car: Car | undefined | null): ICarProps | undefined;

  uploadImage(id: number, request: MulterRequest): void;
}
