import { injectable } from "inversify";
import { ICarProps } from "../../handlers/dtos/ICarProps";
import { IMediator } from "./IMediator";

@injectable()
export class Mediator implements IMediator<ICarProps> {
  private _serviceFactory: <T>(serviceIdentifier: string | symbol) => T;
  constructor(serviceFactory: <T>(serviceIdentifier: string | symbol) => T) {
    this._serviceFactory = serviceFactory;
  }

  async send<T>(seviceIdentifier: symbol | string, req: any): Promise<T> {
    const service = this._serviceFactory<any>(seviceIdentifier);
    return await service.handle(req);
  }
}
