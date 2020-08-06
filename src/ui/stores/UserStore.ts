import { KeyValueStore } from "ui/stores/KeyValueStore";
import User from "@entity/User";
import DataManagement from "services/DataManagement";
import store from "@ioc/mappings/store";
import RemoteRepository from "@services/DataManagement/repository/RemoteRepository";

@store("UserStore")
export default class UserStore extends KeyValueStore<number, User> {

  constructor(manager: DataManagement) {
    super(manager);
  }

  protected get local() {
    return this.manager.localRepository(User);
  }

  protected get remote(): RemoteRepository<User> {
    return this.manager.remoteRepository(User);
  }


}
