import axios, { AxiosInstance } from "axios";
import NetworkConfiguration from "@configuration/NetworkConfiguration";
import component from "@ioc/mappings/component";

@component("HTTP")
export default class HTTP {
  private _instance: AxiosInstance;

  constructor(private readonly config: NetworkConfiguration) {
    this._instance = axios.create({
      baseURL: config.baseURL,
    });
  }
}
