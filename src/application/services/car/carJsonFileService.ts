import { Car } from "../../../domain/car";
import { ICarProps } from "../../handlers/dtos/ICarProps";
import { ICarService } from "./interface/ICarService";
import fs from "fs";
import { injectable } from "inversify";

@injectable()
export class CarJsonFileService {
  private cars: Car[] = [];
  private filePath: string = "carList.json";

  public getCars(): Car[] {
    this.loadFromFile();
    return [...this.cars];
  }

  public findCarById(id: number): Car | undefined {
    this.loadFromFile();
    return this.cars.find((car) => car.id === id);
  }

  public addCar(carProps: Car): Car {
    const car = Car.create(carProps);
    this.cars.push(car);
    this.saveToFile();
    return car;
  }

  public updateCar(id: number, updateCar: ICarProps): Car | undefined {
    this.loadFromFile();
    const existingCar = this.cars.find((car) => car.id === id);
    const updatedCar = this.updateData(existingCar, updateCar);
    this.saveToFile();
    return updatedCar;
  }

  public deleteCarById(id: number): string {
    this.loadFromFile();
    const index = this.cars.findIndex((car) => car.id === id);
    if (index !== -1) {
      this.cars.splice(index, 1);
      return `Car with ID ${id} deleted`;
    } else {
      return `Car with ID ${id} not found`;
    }
  }

  public deleteCar(id: number): string;
  public deleteCar(regNo: string): string;

  public deleteCar(input: number | string): string {
    this.loadFromFile();

    if (typeof input === "number") {
      const index = this.cars.findIndex((car) => car.id === input);
      if (index !== -1) {
        this.cars.splice(index, 1);
        this.saveToFile();
        return `Car with ID ${input} deleted`;
      } else {
        return `Car with ID ${input} not found`;
      }
    } else if (typeof input === "string") {
      const index = this.cars.findIndex((car) => car.regNo === input);
      if (index !== -1) {
        this.cars.splice(index, 1);
        this.saveToFile();
        return `Car with regNo ${input} deleted`;
      } else {
        return `Car with regNo ${input} not found`;
      }
    } else return `incorrect input format`;
  }

  private saveToFile(): void {
    const data = JSON.stringify(this.cars, null, 2);
    fs.writeFile(this.filePath, data, (error) => {
      console.log(`callback fn running for error`);
    });
    console.log(`Data saved to ${this.filePath}`);
  }

  private loadFromFile(): void {
    try {
      const data = fs.readFileSync(this.filePath, "utf-8");
      const carsData = JSON.parse(data);
      // Clear existing cars array
      this.cars = [];

      // Convert JSON data to instances of CarImpl (or your custom Car class)
      carsData.forEach((carData: any) => {
        // const carProps: ICarProps = {
        //   id: carData._id,
        //   regNo: carData._regNo,
        //   brand: carData._brand,
        //   model: carData._model,
        //   year: carData._year,
        //   seatCapacity: carData._seatCapacity,
        // };

        // const car = new Car(carProps);
        // this.cars.push(car);
      });

      console.log(`Data loaded from ${this.filePath}`);
    } catch (error) {
      console.error(`Error loading data from ${this.filePath}:`, error);
    }
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
}
