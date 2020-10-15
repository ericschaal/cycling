import { ApiErrorResponse, ApisauceInstance, create } from "apisauce";
import NetworkConfiguration from "configuration/NetworkConfiguration";
import component from "@ioc/mappings/component";
import ClientError from "components/network/clients/HTTP/errors/ClientError";
import ServerError from "components/network/clients/HTTP/errors/ServerError";
import TimeoutError from "components/network/clients/HTTP/errors/TimeoutError";
import NetworkError from "components/network/clients/HTTP/errors/NetworkError";
import ConnectionError from "components/network/clients/HTTP/errors/ConnectionError";
import { ProblemJSONError } from "./errors/ProblemJSONError";
import RequestCancelledError from "components/network/clients/HTTP/errors/RequestCancelledError";
import { AxiosRequestConfig } from "axios";
import Logging, { Logger } from "services/Logging";
import LoggingMonitor from "components/network/clients/HTTP/monitors/LoggingMonitor";

@component("HTTP")
export default class HTTP {
  private readonly instance: ApisauceInstance;
  private readonly logger: Logger;

  constructor(private readonly config: NetworkConfiguration, logging: Logging) {
    this.instance = create({
      baseURL: config.baseURL
    });
    this.logger = logging.get(HTTP);

    this.instance.addRequestTransform(LoggingMonitor.getRequestTransform(this.logger));
    this.instance.addResponseTransform(LoggingMonitor.getResponseTransform(this.logger));
  }

  public post<T>(url: string, data?: any, axiosConfig?: AxiosRequestConfig) {
    return this.instance.post<T, ProblemJSONError>(url, data, axiosConfig);
  }

  public genericErrorHandler<T>(
    errorResponse: ApiErrorResponse<ProblemJSONError>
  ) {
    switch (errorResponse.problem) {
      case "CLIENT_ERROR":
        throw new ClientError(errorResponse.data!);
      case "SERVER_ERROR":
        throw new ServerError(errorResponse.data!);
      case "TIMEOUT_ERROR":
        throw new TimeoutError();
      case "NETWORK_ERROR":
        throw new NetworkError();
      case "CONNECTION_ERROR":
        throw new ConnectionError();
      case "CANCEL_ERROR":
        throw new RequestCancelledError();
    }
  }
}
