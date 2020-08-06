import chalk from "chalk";
import ansiColor from "ansicolor";
import prefix from "loglevel-plugin-prefix";
import log from "loglevel";
import service from "@ioc/mappings/service";
import LoggingConfiguration from "configuration/LoggingConfiguration";
import { ComponentType } from "@ioc/types/ComponentType";
import { componentTypeKey, componentNameKey } from "@ioc/constants/metadata";

export type Logger = log.Logger;

@service("Logging")
export default class Logging {
  private readonly globalLogger: log.Logger;

  constructor(private config: LoggingConfiguration) {
    log.setDefaultLevel(config.LogLevel);
    prefix.reg(log);
    this.globalLogger = log.getLogger("Global");
    this.applyPrefix(this.globalLogger);
  }

  private get colorResolver() {
    if (this.config.ansiColorMode) {
      return ansiColor;
    } else {
      return chalk;
    }
  }

  private get colors() {
    return {
      TRACE: this.colorResolver.magenta,
      DEBUG: this.colorResolver.cyan,
      INFO: this.colorResolver.blue,
      WARN: this.colorResolver.yellow,
      ERROR: this.colorResolver.red,
    };
  }

  private applyPrefix(logger: log.Logger, componentType?: ComponentType) {
    const colors = this.colors;
    const colorResolver = this.colorResolver;

    prefix.apply(logger, {
      format(level: string, name, timestamp) {
        const elements: string[] = [
          colorResolver.blue(`[${timestamp}]`),
          //@ts-ignore
          colors[level.toUpperCase()](level),
        ];
        if (componentType !== undefined) {
          elements.push(colorResolver.green(`[${componentType}]`));
        }
        elements.push(colorResolver.green(`${name}:`));
        return elements.join(" ");
      },
    });
    return logger;
  }

  public get<T extends { new (...args: any[]): {} }>(constructor: T) {
    const name = Reflect.getMetadata(componentNameKey, constructor);
    const componentType = Reflect.getMetadata(componentTypeKey, constructor);
    if (name === undefined) {
      throw new Error("Could not read name from metadata");
    }
    const logger = log.getLogger(name);
    return this.applyPrefix(logger, componentType);
  }

  public global() {
    return this.globalLogger;
  }
}
