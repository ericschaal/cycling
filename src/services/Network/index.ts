import DeviceNetworkResource from "@components/network/resources/DeviceNetworkResource";
import MeasurementNetworkResource from "@components/network/resources/MeasurementNetworkResource";
import service from "@ioc/mappings/service";
import { ObjectType } from "typeorm/common/ObjectType";
import RemoteRepository from "services/DataManagement/repository/RemoteRepository";
import UserAccountResource from "components/network/resources/UserAccountResource";

@service("Network")
export default class Network {
  constructor(
    public readonly userAccount: UserAccountResource,
    public readonly device: DeviceNetworkResource,
    public readonly measurements: MeasurementNetworkResource
  ) {}

  getRepository<K, V>(target: ObjectType<V>) {
    return new RemoteRepository<K, V>();
  }
}
