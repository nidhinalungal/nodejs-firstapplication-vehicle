import { Car } from "../../../../domain/car";
import { CarEntity } from "../../../models/CarEntity";
import { UserMapper } from "./userMapper";

export class CarMapper {
  static toDomain(car: CarEntity): Car {
    const carProps = {
      id: car.id,
      regNo: car.regNo,
      brand: car.brand,
      model: car.model,
      year: car.year,
      seatCapacity: car.seatCapacity,
      user: UserMapper.toDomain(car.user)
    };
    return new Car(carProps);
  }

  static toEntity(car: Car): CarEntity {
    const carEntity: CarEntity = new CarEntity();
    carEntity.id = car.id;
    carEntity.regNo = car.regNo;
    carEntity.brand = car.brand;
    carEntity.year = car.year;
    carEntity.model = car.model;
    carEntity.seatCapacity = car.seatCapacity;
    return carEntity;
  }
}
