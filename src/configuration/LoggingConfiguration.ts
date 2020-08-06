import configuration from "@ioc/mappings/configuration";
import { LogLevelDesc } from "loglevel";
import ApplicationConfiguration from "configuration/ApplicationConfiguration";

@configuration("LocalizationConfiguration")
export default class LoggingConfiguration {
  constructor(private appConfig: ApplicationConfiguration) {}

  public readonly LogLevel: LogLevelDesc = "debug";
  public readonly ansiColorMode: boolean = true;
}
