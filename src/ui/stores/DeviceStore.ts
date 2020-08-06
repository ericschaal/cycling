import { KeyValueStore } from "ui/stores/KeyValueStore";
import Device from "@entity/Device";
import { Repository } from "typeorm";
import store from "@ioc/mappings/store";
import DataManagement from "services/DataManagement";
import RemoteRepository from "services/DataManagement/repository/RemoteRepository";

@store("DeviceStore")
export default class DeviceStore extends KeyValueStore<string, Device>{

  constructor(manager: DataManagement) {
    super(manager);
  }

  protected get local(): Repository<Device> {
    return this.manager.localRepository(Device);
  }

  protected get remote(): RemoteRepository<string, Device> {
    return this.manager.remoteRepository(Device);
  }



}