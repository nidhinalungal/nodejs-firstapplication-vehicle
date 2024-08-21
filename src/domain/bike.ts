import { IBikeProps } from "../application/handlers/dtos/IBikeProps";
import { Vehicle } from "./vehicle";

export class Bike extends Vehicle {
  constructor(bikeProps: IBikeProps) {
    super(bikeProps);
  }
  honk(): void {
    console.log(`${this.brand} ${this.model} beep beep!`);
  }

  public static create(bikeProps: IBikeProps): Bike {
    return new Bike(bikeProps);
  }
}
