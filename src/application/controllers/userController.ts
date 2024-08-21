import {
  controller,
  httpGet,
  httpPost,
  requestBody,
  requestParam,
  response,
} from "inversify-express-utils/lib/decorators";
import { Request, Response } from "express";
import { TYPES } from "../utilities/types";
import { IUserService } from "../services/user/IUserService";
import { inject } from "inversify";
import { IUserProps } from "../handlers/dtos/IUserProps";
import { validateUserProps } from "./validators/userPropsValidator";
import { User } from "../../domain/user";
import { validateLogin } from "./validators/validateLogin";
import { ILoginProps } from "../handlers/dtos/ILoginProps";

@controller("/users")
class UserController {
  constructor(@inject(TYPES.IUserService) private userService: IUserService) {}

  @httpGet("/")
  public async getUsers(req: Request, res: Response): Promise<void> {
    const data = await this.userService.getUsers();
    res.status(200).send(data.map((user: User) => user.toIUserProps()));
  }

  @httpGet("/:name")
  public async getUserById(
    @requestParam("name") name: string,
    @response() res: Response
  ): Promise<void> {
    const data = await this.userService.findUserByName(name);
    res.status(200).send(data?.toIUserProps);
  }

  @httpPost("/", validateUserProps)
  public async createUser(
    @requestBody() userProps: IUserProps,
    @response() res: Response
  ): Promise<void> {
    const data = await this.userService.saveUser(userProps);
    res.status(201).send(data.toIUserProps());
  }

  @httpPost("/login", validateLogin)
  public async login(
    @requestBody() loginProps: ILoginProps,
    @response() res: Response
  ): Promise<void> {
    const data = await this.userService.login(loginProps);
    res.status(201).send(data);
  }
}
