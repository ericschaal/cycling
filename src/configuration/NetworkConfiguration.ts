import configuration from "@ioc/mappings/configuration";

@configuration("NetworkConfiguration")
export default class NetworkConfiguration {
  public readonly baseURL = "https://app.schaal.dev";
  public readonly endpoints = {
    login: "/auth/login",
  }
}
