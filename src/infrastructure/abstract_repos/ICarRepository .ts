import { CarEntity } from "../models/CarEntity";

export interface ICarRepository {
  getById(id: number): Promise<CarEntity | null>;
  getAll(): Promise<CarEntity[]>;
  save(car: CarEntity): Promise<CarEntity>;
  deleteById(id: number): Promise<boolean>;
  deleteByRegNo(id: string): Promise<boolean>;
  getCarsAddedToday(startDate: Date, endDate: Date): Promise<CarEntity[]>;
}
