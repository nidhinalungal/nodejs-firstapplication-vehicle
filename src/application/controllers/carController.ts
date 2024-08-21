import { Request, Response } from "express";
import { inject } from "inversify";
import {
  controller,
  httpDelete,
  httpGet,
  httpPost,
  httpPut,
  request,
  requestBody,
  requestParam,
  response,
} from "inversify-express-utils";
import { TYPES } from "../utilities/types";
import { AddCarHandler } from "../handlers/addCarHandler";
import { GetCarByIdHandler } from "../handlers/getCarByIdHandler";
import { GetCarsHandler } from "../handlers/getCarsHandler";
import { DeleteCarHandler } from "../handlers/deleteCarHandler";
import { UpdateCarHandler } from "../handlers/updateCarHandler";
import { UploadImageHandler } from "../handlers/uploadImageHandler";

import { ICarService } from "../services/car/interface/ICarService";
import { ICarProps } from "../handlers/dtos/ICarProps";
import { Mediator } from "../utilities/mediator/mediator";
import multer from "multer";
import { upload } from "../../config/multerConfig";
import { MulterRequest } from "../utilities/MulterRequest";
import { validateCarProps } from "./validators/carPropsValidator";
import { authorizeRole } from "./validators/authorizeRole";

@controller("/cars")
class CarController {
  constructor(
    @inject(TYPES.ICarService) private carService: ICarService,
    // @inject(TYPES.getCarsHandler) private getCarsHandler: getCarsHandler, //use mediator instead of multiple handlers
    // @inject(TYPES.GetCarByIdHandler) private getCarHandler: GetCarByIdHandler,
    // @inject(TYPES.AddCarHandler) private addCarHandler: AddCarHandler,
    @inject(TYPES.UpdateCarHandler) private updateCarHandler: UpdateCarHandler,
    // @inject(TYPES.DeleteCarHandler) private deleteCarHandler: DeleteCarHandler,
    @inject(TYPES.UploadImageHandler)
    private uploadImageHandler: UploadImageHandler,

    @inject(TYPES.IMediator) private mediator: Mediator
  ) {}

  @httpGet("/hello")
  public hello(req: Request, res: Response): void {
    res.status(200).json({
      message: "Welcome to CarController!!",
    });
  }

  @httpGet("/")
  public async getCars(req: Request, res: Response): Promise<void> {
    const data = await this.mediator.send<(ICarProps | undefined)[]>(
      TYPES.GetCarsHandler,
      req
    );
    res.status(200).send(data);
  }

  @httpGet("/:id")
  public async getCarById(
    @requestParam("id") id: number,
    @response() res: Response
  ): Promise<void> {
    const data = await this.mediator.send<ICarProps>(
      TYPES.GetCarByIdHandler,
      id
    );
    res.status(200).send(data);
  }

  @httpPost("/", validateCarProps)
  public async createCar(
    @requestBody() carProps: ICarProps,
    @response() res: Response
  ): Promise<void> {
    // const data = await this.addCarHandler.handle(carProps);
    const data = await this.mediator.send<ICarProps | undefined | null>(
      TYPES.AddCarHandler,
      carProps
    );
    res.status(201).send(data);
  }

  @httpDelete("/:id")
  public async deleteCar(
    @requestParam("id") id: number | string,
    @response() res: Response
  ): Promise<void> {
    // const deleted = await this.deleteCarHandler.handle(id);
    const deleted = await this.mediator.send<Boolean>(
      TYPES.DeleteCarHandler,
      id
    );
    res.status(200).json({ deleted: deleted });
  }

  @httpPut("/:id", validateCarProps)
  public async updateCarById(
    @requestParam("id") id: number,
    @requestBody() carProps: ICarProps,
    @response() res: Response
  ): Promise<void> {
    carProps.id = id;
    const data = await this.updateCarHandler.handle(carProps);
    res.status(200).send(data);
  }

  @httpPost("/upload/:id", upload.single("file"))
  public async uploadImage(
    @requestParam("id") id: number,
    req: MulterRequest,
    res: Response
  ): Promise<void> {
    if (!req.file) {
      res.status(400).send("File is not attached in the request");
      return;
    }
    this.uploadImageHandler.handle(id, req);
    res.status(200).send(`File uploaded successfully: ${req.file.filename}`);
  }
}
