import { injectable } from "inversify";
import { Repository } from "typeorm";
import { UserEntity } from "../../models/UserEntity";
import { dataSource } from "../../../config/dataSource";
import { IUserRepository } from "../../abstract_repos/IUserRepository";

@injectable()
export class UserOrmRepository implements IUserRepository {
  private carRepository: Repository<UserEntity>;

  constructor() {
    this.carRepository = dataSource.getRepository(UserEntity);
  }

  async getById(id: string): Promise<UserEntity | null> {
    return await this.carRepository.findOneBy({ id });
  }
  async getByName(username: string): Promise<UserEntity | null> {
    return await this.carRepository.findOneBy({ username });
  }

  async getAll(): Promise<UserEntity[]> {
    return await this.carRepository.find();
  }

  async save(car: UserEntity): Promise<UserEntity> {
    return await this.carRepository.save(car);
  }

  async deleteById(id: string): Promise<boolean> {
    const result = await this.carRepository.delete(id);
    return result.affected !== 0;
  }
}
