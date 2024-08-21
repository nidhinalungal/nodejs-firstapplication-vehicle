import { Bike } from "../../../domain/bike";
import IBikeService from "./IBikeService";

class BikeInMemoryService implements IBikeService {
  private bikes: Bike[] = [];

  addBike(bike: Bike): void {
    this.bikes.push(bike);
  }

  deleteBike(index: number): void {
    if (index >= 0 && index < this.bikes.length) {
      this.bikes.splice(index, 1);
    } else {
      console.log("Invalid index");
    }
  }

  getBikes(): Bike[] {
    return this.bikes;
  }
}
export default new BikeInMemoryService();
