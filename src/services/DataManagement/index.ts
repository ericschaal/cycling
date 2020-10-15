import service from "@ioc/mappings/service";
import Database from "@components/storage/Database";
import Logging, { Logger } from "@services/Logging";
import { ObjectType } from "typeorm/common/ObjectType";
import { EntitySchema } from "typeorm";
import Network from "services/Network";

@service("DataManagement")
export default class DataManagement {
  private readonly logger: Logger;

  constructor(private db: Database, private net: Network, logging: Logging) {
    this.logger = logging.get(DataManagement);
  }

  public async init() {
    try {
      await this.db.open();
    } catch (e) {
      this.logger.error(e);
      return Promise.reject(new Error("Failed to initialize."));
    }
  }

  private get connection() {
    if (this.db.connection === null) {
      throw new Error("Connection not opened.");
    } else {
      return this.db.connection;
    }
  }

  public localRepository<T>(target: ObjectType<T> | EntitySchema<T> | string) {
    return this.connection.getRepository(target);
  }

  public remoteRepository<K, V>(target: ObjectType<V>) {
    return this.net.getRepository<K, V>(target);
  }

  public network() {
    return this.net;
  }

}
