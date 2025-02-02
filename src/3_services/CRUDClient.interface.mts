import Client from "./Client.interface.mjs";
import IOR from "./IOR.interface.mjs";

type Response = import("node-fetch/@types/index").Response;

export type HttpResponse = Response & { parsedData?: any };

export default interface CRUD_Client extends Client {
  create(ior: IOR, data?: any): Promise<HttpResponse>
  retrieve(ior: IOR): Promise<HttpResponse>
  update(ior: IOR, data?: any): Promise<HttpResponse>
  delete(ior: IOR): Promise<HttpResponse>
}
