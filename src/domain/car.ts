import { ICarProps } from "../application/handlers/dtos/ICarProps";
import { User } from "./user";
import { Vehicle } from "./vehicle";

export class Car extends Vehicle {
  private _seatCapacity: number;
  private _user: User;

  constructor(carProps: ICarProps) {
    super(carProps);
    this._seatCapacity = carProps.seatCapacity;
    this._user = User.create(carProps.user);
  }

  get seatCapacity(): number {
    return this._seatCapacity;
  }

  set seatCapacity(seatCapacity: number) {
    this._seatCapacity = seatCapacity;
  }

  get user(): User {
    return this._user;
  }

  set user(user: User) {
    this._user = user;
  }

  public static create(carProps: ICarProps): Car {
    return new Car(carProps);
  }

  honk(): void {
    console.log(`${this.brand} ${this.model} honk honk!`);
  }

  stop(): void {
    console.log(
      ` ${this.brand} ${this.model} ${this.year} Car engine stopped.`
    );
  }

  toICarProps(): ICarProps {
    return {
      id: this.id,
      regNo: this.regNo,
      brand: this.brand,
      model: this.model,
      year: this.year,
      seatCapacity: this.seatCapacity,
      user: this._user,
    };
  }
}
