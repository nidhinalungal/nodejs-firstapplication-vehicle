import { injectable } from "inversify";
import { Between, Repository } from "typeorm";
import { ICarRepository } from "../../abstract_repos/ICarRepository ";
import { CarEntity } from "../../models/CarEntity";
import { dataSource } from "../../../config/dataSource";

@injectable()
export class CarOrmRepository implements ICarRepository {
  private carRepository: Repository<CarEntity>;

  constructor() {
    this.carRepository = dataSource.getRepository(CarEntity);
  }
  async getById(id: number): Promise<CarEntity | null> {
    return await this.carRepository.findOneBy({ id });
  }

  async getAll(): Promise<CarEntity[]> {
    return await this.carRepository.find();
  }

  async save(car: CarEntity): Promise<CarEntity> {
    return await this.carRepository.save(car);
  }

  async deleteById(id: number): Promise<boolean> {
    const result = await this.carRepository.delete(id);
    return result.affected !== 0;
  }

  async deleteByRegNo(regNo: string): Promise<boolean> {
    const result = await this.carRepository.delete({ regNo });
    return result.affected !== 0;
  }

 async getCarsAddedToday(startDate: Date, endDate: Date): Promise<CarEntity[]> {
    return await this.carRepository.find({
      where: {
        createdAt: Between(startDate, endDate) 
      }
    });
  }
}
