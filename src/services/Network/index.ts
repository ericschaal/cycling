import DeviceNetworkResource from "@components/DeviceNetworkResource";
import MeasurementNetworkResource from "@components/MeasurementNetworkResource";
import service from "@ioc/mappings/service";
import { ObjectType } from "typeorm/common/ObjectType";
import RemoteRepository from "services/DataManagement/repository/RemoteRepository";

@service("Network")
export default class Network {
  constructor(
    public readonly device: DeviceNetworkResource,
    public readonly measurements: MeasurementNetworkResource
  ) {}

  getRepository<K, V>(target: ObjectType<V>) {
    return new RemoteRepository<K, V>();
  }

}
