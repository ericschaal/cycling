import configuration from "@ioc/mappings/configuration";

@configuration("ApplicationConfiguration")
export default class ApplicationConfiguration {
  public get isRemoteDebuggingActive() {
    return global.location && global.location.pathname.includes("/debugger-ui");
  }
}
