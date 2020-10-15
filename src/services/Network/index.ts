import service from "@ioc/mappings/service";
import { ObjectType } from "typeorm/common/ObjectType";
import RemoteRepository from "services/DataManagement/repository/RemoteRepository";
import UserAccountResource from "components/network/resources/UserAccountResource";

@service("Network")
export default class Network {
  constructor(
    public readonly userAccount: UserAccountResource
  ) {
  }

  getRepository<K, V>(target: ObjectType<V>) {
    return new RemoteRepository<K, V>();
  }
}
