import { User } from "../../../domain/user";
import { ILoginProps } from "../../handlers/dtos/ILoginProps";
import { IUserProps } from "../../handlers/dtos/IUserProps";

export interface IUserService {
  login(loginProps: ILoginProps): Promise<string>;
  getUsers(): Promise<User[]>;
  findUserByName(name: string): Promise<User | null>;
  saveUser(carProps: IUserProps): Promise<User>;
  //   updateCar(id: number, updateCar: IUserProps): Promise<User | null>;
  //   deleteCar(id: number): Promise<boolean>;
}
