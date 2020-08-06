import component from "@ioc/mappings/component";
import HTTP from "components/network/clients/HTTP";
import BadCredentialsError from "./errors/BadCredentialsError";
import WebSocket from "components/network/clients/WebSocket";
import NetworkConfiguration from "configuration/NetworkConfiguration";

@component("UserAccountResource")
export default class UserAccountResource {
  constructor(
    private readonly http: HTTP,
    private readonly ws: WebSocket,
    private readonly config: NetworkConfiguration
  ) {}

  public async login(username: string, password: string) {
    const response = await this.http.post<void>(this.config.endpoints.login, {
      username,
      password,
      rememberMe: true,
    });
    if (!response.ok) {
      if (response.status === 401) {
        throw new BadCredentialsError();
      } else {
        this.http.genericErrorHandler(response);
      }
    }
  }
  public async logout() {}
  public async getAccount() {}
}
