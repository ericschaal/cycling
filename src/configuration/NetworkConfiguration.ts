import configuration from "@ioc/mappings/configuration";

@configuration("NetworkConfiguration")
export default class NetworkConfiguration {
  public readonly baseURL = "https://dev.gateway.my01.io";
}
