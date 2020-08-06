import DataManagement from "services/DataManagement";
import { computed, observable, runInAction } from "mobx";
import { Repository } from "typeorm";
import RemoteRepository from "@services/DataManagement/repository/RemoteRepository";

export abstract class KeyValueStore<K, V> {
  @observable protected readonly data: Map<K, V> = new Map<K, V>();

  protected constructor(protected manager: DataManagement) {}

  public async rehydrate() {
    const loaded = await this.local.find();
    runInAction(() => {
      loaded.forEach((entry) => {
        this.data.set(this.local.getId(entry), entry);
      });
    });
  }

  protected abstract get local(): Repository<V>;
  protected abstract get remote(): RemoteRepository<K, V>;

  public async get(id: K): Promise<V | null> {
    return null;
  }

  public async all(): Promise<V[]> {
    return Array.from(this.data.values());
  }

  @computed
  public async ids(): Promise<K[]> {
    return Array.from(this.data.keys());
  }
}
