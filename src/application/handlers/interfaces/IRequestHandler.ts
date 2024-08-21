import { ICarProps } from "../dtos/ICarProps";

export interface IRequestHandler<T, P> {
  handle(params:P): Promise<T>;
}
