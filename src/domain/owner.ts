import { v4 as uuidv4 } from "uuid";
import { IOwnerProps } from "../application/handlers/dtos/IOwnerProps";

class Owner {
  private readonly _id: string;
  private _name: string;
  private _age: string;
  private _address: string;

  constructor(ownerProps: IOwnerProps) {
    this._id = uuidv4();
    this._name = ownerProps.name;
    this._age = ownerProps.age;
    this._address = ownerProps.address;
  }

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public set name(name: string) {
    this._name = name;
  }

  public get age(): string {
    return this._age;
  }

  public set age(age: string) {
    this._age = age;
  }

  public get address(): string {
    return this._address;
  }

  public set address(address: string) {
    this._address = address;
  }
}
