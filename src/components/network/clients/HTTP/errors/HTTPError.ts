import ClientError from "components/network/clients/HTTP/errors/ClientError";
import ConnectionError from "components/network/clients/HTTP/errors/ConnectionError";
import NetworkError from "components/network/clients/HTTP/errors/NetworkError";
import ServerError from "components/network/clients/HTTP/errors/ServerError";
import TimeoutError from "components/network/clients/HTTP/errors/TimeoutError";
import RequestCancelledError from "components/network/clients/HTTP/errors/RequestCancelledError";

export type HTTPError =
  | ClientError
  | ConnectionError
  | NetworkError
  | ServerError
  | TimeoutError
  | RequestCancelledError;
