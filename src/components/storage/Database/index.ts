import { Connection, createConnection } from "typeorm";
import component from "@ioc/mappings/component";
import DatabaseConfiguration from "configuration/DatabaseConfiguration";
import Logging, { Logger } from "services/Logging";

@component("Database")
export default class Database {
  private _connection: Connection | null = null;
  private logger: Logger;

  constructor(private config: DatabaseConfiguration, logging: Logging) {
    this.logger = logging.get(Database);
  }

  public async open(): Promise<void> {
    if (this._connection !== null) {
      return this.logger.warn(
        "Trying to open already opened connection. This is a no-op."
      );
    } else {
      this._connection = await createConnection({
        database: this.config.name,
        driver: this.config.driver,
        entities: this.config.entities,
        synchronize: this.config.synchronize,
        type: this.config.databaseType,
      });
      this.logger.info("Database connection opened.");
    }
  }

  public async close() {
    if (this._connection === null) {
      this.logger.warn(
        "Trying to close not opened database connection. This is a no-op."
      );
      return Promise.resolve();
    } else {
      await this._connection.close();
      this._connection = null;
      this.logger.info("Database connection closed.");
    }
  }

  get connection(): Connection | null {
    return this._connection;
  }
}
