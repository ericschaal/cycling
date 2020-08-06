import { Logger } from "loglevel";
import {
  ApiResponse,
  RequestTransform,
  ResponseTransform,
} from "apisauce";
import { AxiosRequestConfig } from "axios";

export default class LoggingMonitor {
  public static getRequestTransform(logger: Logger): RequestTransform {
    return (request: AxiosRequestConfig) => {
      try {
        logger.trace(
          `[Request][${request.method?.toUpperCase()}] ${request.url}`,
          request.data
        );
      } catch (e) {
        logger.error("FIXME: Failed to log request.", e);
      }
    };
  }

  public static getResponseTransform(logger: Logger): ResponseTransform {
    return (response: ApiResponse<any>) => {
      try {
        if (response.ok) {
          logger.trace(
            `[Response][${response.config?.method?.toUpperCase()}][${response.status}] ${
              response.config!.url
            }`,
            response.data
          );
        } else {
          logger.error(
            `[Response][${response.config?.method?.toUpperCase()}][${response.status}] ${
              response.config!.url
            }`,
            response.data
          );
        }
      } catch (e) {
        logger.error("FIXME: Failed to log response.", e);
      }
    };
  }
}
