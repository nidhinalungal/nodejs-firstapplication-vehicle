import { inject, injectable } from "inversify";
import { Car } from "../../../domain/car";
import { ICarProps } from "../../handlers/dtos/ICarProps";
import { ICarService } from "./interface/ICarService";
import { ICarRepository } from "../../../infrastructure/abstract_repos/ICarRepository ";
import { TYPES } from "../../utilities/types";
import { CarMapper } from "../../../infrastructure/data_access/orm_repository/mappers/carMapper";
import { CarEntity } from "../../../infrastructure/models/CarEntity";
import { MulterRequest } from "../../utilities/MulterRequest";
import { User } from "../../../domain/user";
import { UserMapper } from "../../../infrastructure/data_access/orm_repository/mappers/userMapper";
import { IUserRepository } from "../../../infrastructure/abstract_repos/IUserRepository";

@injectable()
export class CarDataBaseService implements ICarService {
  constructor(
    @inject(TYPES.ICarRepository) private carRepository: ICarRepository,
    @inject(TYPES.IUserRepository) private userRepository: IUserRepository
  ) {}

  uploadImage(id: number, request: MulterRequest) {
    // save file name in table
    console.info(
      `image saved for carId : ${id}, imageName : ${request.file.filename}`
    );
  }

  async getCars(): Promise<Car[]> {
    try {
      const cars: CarEntity[] = await this.carRepository.getAll();
      return cars.map((car: CarEntity) => CarMapper.toDomain(car));
    } catch (error) {
      throw new Error(`Error getting cars: ${error}`);
    }
  }

  async findCarById(id: number): Promise<Car | null> {
    try {
      const car: CarEntity | null = await this.carRepository.getById(id);
      if (car == null) {
        return null;
      } else {
        return CarMapper.toDomain(car);
      }
    } catch (error) {
      throw new Error(`Error adding car: ${error}`);
    }
  }

  async saveCar(carProps: ICarProps): Promise<Car> {
    try {
      const car: Car = Car.create(carProps);
      const user = await this.userRepository.getById(carProps.user.id);
      const carEntity = CarMapper.toEntity(car);
      if (user == null) {
        throw new Error(`User not found with id : ${carProps.user.id}`);
      }
      carEntity.user = user;
      const savedCar = await this.carRepository.save(carEntity);
      return CarMapper.toDomain(savedCar);
    } catch (error) {
      throw new Error(`Error Saving car: ${error}`);
    }
  }

  async updateCar(id: number, updateCar: ICarProps): Promise<Car | null> {
    const car: CarEntity | null = await this.carRepository.getById(id);
    if (car == null) {
      return null;
    } else {
      const updatedCar = this.updateCarDetails(car, updateCar);
      if (updatedCar != null) {
        const car: Car = Car.create(updatedCar);
        updateCar.id = car.id;
        const res = await this.carRepository.save(CarMapper.toEntity(car));
        return CarMapper.toDomain(res);
      }
      return null;
    }
  }

  async deleteCar(id: number): Promise<boolean>;
  async deleteCar(regNo: string): Promise<boolean>;

  async deleteCar(input: number | string): Promise<boolean> {
    if (typeof input === "number") {
      return await this.carRepository.deleteById(input);
    } else if (typeof input === "string") {
      return await this.carRepository.deleteByRegNo(input);
    } else return false;
  }

  private updateCarDetails(car: CarEntity | null, updateCar: ICarProps) {
    if (car) {
      car.id, (car.regNo = updateCar.regNo);
      car.brand = updateCar.brand;
      car.model = updateCar.model;
      car.year = updateCar.year;
      car.seatCapacity = updateCar.seatCapacity;
      const user: User = User.create(updateCar.user);
      car.user = UserMapper.toEntity(user);
      return car;
    } else {
      return null;
    }
  }

  private callApplyBind() {
    const person = { name: "Alice" };

    // Using call
    greet.call(person, "Hello", "!"); // Hello, Alice!

    // Using apply
    greet.apply(person, ["Hi", "!!"]); // Hi, Alice!!

    // Using bind
    const boundGreet = greet.bind(person, "Hey");
    boundGreet("!!!"); // Hey, Alice!!!
  }

  toICarProps(car: Car | undefined | null): ICarProps | undefined {
    if (car) {
      return {
        id: car.id,
        regNo: car.regNo,
        brand: car.brand,
        model: car.model,
        year: car.year,
        seatCapacity: car.seatCapacity,
        user: {
          id: car.user.id,
          name: car.user.name,
          username: car.user.username,
          password: car.user.password,
          role: car.user.role,
        },
      };
    } else return;
  }
}

function greet(this: { name: string }, greeting: string, punctuation: string) {
  console.log(greeting + ", " + this.name + punctuation);
}

