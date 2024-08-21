import { UserEntity } from "../models/UserEntity";

export interface IUserRepository {
  getById(id: string): Promise<UserEntity | null>;
  getByName(name: string): Promise<UserEntity | null>;
  getAll(): Promise<UserEntity[]>;
  save(car: UserEntity): Promise<UserEntity>;
  //   deleteById(id: number): Promise<boolean>;
}
