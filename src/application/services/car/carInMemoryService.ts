import { Car } from "../../../domain/car";
import { ICarProps } from "../../handlers/dtos/ICarProps";
import { ICarService } from "./interface/ICarService";
import { injectable } from "inversify";

@injectable()
export class CarInMemoryService {
  private cars: Car[] = [];

  public getCars(): Car[] {
    this.logCarModels(this.cars);
    return [...this.cars];
  }

  public findCarById(id: number): Car | undefined {
    return this.cars.find((car) => car.id === id);
  }

  public addCar(carProps: ICarProps): Car {
    const car = Car.create(carProps);
    this.cars.push(car);
    console.log(this.cars);
    return car;
  }

  public updateCar(id: number, updateCar: ICarProps): Car | undefined {
    const existingCar = this.cars.find((car) => car.id === id);
    const updatedCar = this.updateData(existingCar, updateCar);
    return updatedCar;
  }

  public deleteCar(id: number): string;
  public deleteCar(regNo: string): string;

  public deleteCar(input: number | string): string {
    if (typeof input === "number") {
      const index = this.cars.findIndex((car) => car.id === input);
      if (index !== -1) {
        this.cars.splice(index, 1);
        return `Car with ID ${input} deleted`;
      } else {
        return `Car with ID ${input} not found`;
      }
    } else if (typeof input === "string") {
      const index = this.cars.findIndex((car) => car.regNo === input);
      if (index !== -1) {
        this.cars.splice(index, 1);
        return `Car with regNo ${input} deleted`;
      } else {
        return `Car with regNo ${input} not found`;
      }
    } else return `incorrect input format`;
  }

  private updateData(car: Car | undefined, updateCar: ICarProps) {
    if (car) {
      car.regNo = updateCar.regNo;
      car.brand = updateCar.brand;
      car.model = updateCar.model;
      car.year = updateCar.year;
      car.seatCapacity = updateCar.seatCapacity;
      return car;
    } else {
      return undefined;
    }
  }

  private logCarModels(cars: Car[]) {
    // using for loop
    for (let i = 0; i < cars.length; i++) {
      console.log(cars[i].model);
    }

    // using while loop
    let j = 0;
    while (j < cars.length) {
      console.log(cars[j].model);
      j++;
    }
  }
}

function greet(name: string) {
  return "Hello, " + name + "!";
}

const square = function (a: number) {
  return a * a;
};

console.log(greet("Nidhin"));
