import { UUID } from "crypto";
import { IVehicleProps } from "./IVehicleProps";
import { User } from "../../../domain/user";
import { IUserProps } from "./IUserProps";

export interface ICarProps extends IVehicleProps {
  seatCapacity: number;
  user: IUserProps;
}
