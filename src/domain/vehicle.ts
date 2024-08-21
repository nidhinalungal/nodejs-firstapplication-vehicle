import { IVehicleProps } from "../application/handlers/dtos/IVehicleProps";

export abstract class Vehicle {
  private _id: number;
  private _regNo: string;
  private _brand: string;
  private _model: string;
  private _year: string;

  constructor(vehicleProps: IVehicleProps) {
    this._id = vehicleProps.id;
    this._regNo = vehicleProps.regNo;
    this._brand = vehicleProps.brand;
    this._model = vehicleProps.model;
    this._year = vehicleProps.year;
    this.start();
    this.honk();
    this.stop();
  }

  abstract honk(): void;

  start(): void {
    console.log(`${this._brand} ${this._model} ${this._year} engine started.`);
  }

  stop(): void {
    console.log(`${this._brand} ${this._model} ${this._year} engine stopped.`);
  }

  // Getters
  get id(): number {
    return this._id;
  }

  get regNo(): string {
    return this._regNo;
  }

  get brand(): string {
    return this._brand;
  }

  get model(): string {
    return this._model;
  }

  get year(): string {
    return this._year;
  }

  // Setters
  set id(id: number) {
    this._id = id;
  }

  set regNo(regNo: string) {
    this._regNo = regNo;
  }

  set brand(brand: string) {
    this._brand = brand;
  }

  set model(model: string) {
    this._model = model;
  }

  set year(year: string) {
    this._year = year;
  }
}
