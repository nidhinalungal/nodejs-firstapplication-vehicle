import { v4 as uuidv4 } from "uuid";
import { IUserProps } from "../application/handlers/dtos/IUserProps";

export class User {
  private readonly _id: string;
  private _name: string;
  private _username: string;
  private _password: string;
  private _role: string;

  constructor(userProps: IUserProps) {
    this._id = uuidv4();
    this._name = userProps.name;
    this._username = userProps.username;
    this._password = userProps.password;
    this._role = userProps.role;
  }

  public get id(): string {
    return this._id;
  }

  public get username(): string {
    return this._username;
  }

  public set username(_username: string) {
    this._username = _username;
  }

  public get password(): string {
    return this._password;
  }

  public set password(_password: string) {
    this._password = _password;
  }

  public get name(): string {
    return this._name;
  }

  public set name(_name: string) {
    this._name = _name;
  }

  public get role(): string {
    return this._role;
  }

  public set role(_role: string) {
    this._role = _role;
  }

  public static create(userProps: IUserProps): User {
    return new User(userProps);
  }

  toIUserProps(): IUserProps {
    return {
      id: this.id,
      name: this.name,
      username: this.username,
      password: this.password,
      role: this.role,
    };
  }
}
