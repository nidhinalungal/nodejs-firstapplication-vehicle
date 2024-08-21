import { ILoocationsProps } from "../application/handlers/dtos/ILocationsProps";

class Locations {
  public readonly _city: string;
  public readonly _state: string;
  public readonly _country: string;

  constructor(locationProps: ILoocationsProps) {
    this._city = locationProps.city;
    this._state = locationProps.state;
    this._country = locationProps.country;
  }
}
