import configuration from "@ioc/mappings/configuration";
import User from "@entity/User";
import Device from "@entity/Device";

@configuration("DatabaseConfiguration")
export default class DatabaseConfiguration {

  public readonly databaseType = "expo";

  public get entities() {
    return [
      User,
      Device
    ]
  }

  public get driver() {
    return require('expo-sqlite');
  }

  public get name() {
    return __DEV__ ? "dev" : "prod"
  }

  public get synchronize() {
    return true;
  }

}