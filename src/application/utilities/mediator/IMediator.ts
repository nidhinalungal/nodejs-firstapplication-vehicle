
export interface IMediator<T> {
  send(seviceIdentifier: symbol | string, req: any): Promise<T>;
}
