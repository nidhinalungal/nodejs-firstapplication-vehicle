import { inject, injectable } from "inversify";
import { TYPES } from "../utilities/types";
import { ICarProps } from "./dtos/ICarProps";
import { ICarService } from "../services/car/interface/ICarService";
import { MulterRequest } from "../utilities/MulterRequest";

@injectable()
export class UploadImageHandler {
  constructor(@inject(TYPES.ICarService) private carService: ICarService) {}

  public async handle(
    id: number,
    req: MulterRequest
  ): Promise<ICarProps | undefined | null> {
    const car = this.carService.uploadImage(id, req);
    return;
  }
}
