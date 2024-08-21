import { Bike } from "../../../domain/bike";

interface IBikeService {
  addBike(bike: Bike): void;
  deleteBike(index: number): void;
  getBikes(): Bike[];
}

export default IBikeService;
