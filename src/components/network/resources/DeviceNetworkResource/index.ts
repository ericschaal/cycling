import HTTP from "components/network/clients/HTTP";
import WebSocket from "components/network/clients/WebSocket";
import component from "@ioc/mappings/component";

@component("DeviceNetworkResource")
export default class DeviceNetworkResource {
  constructor(private readonly http: HTTP, private readonly ws: WebSocket) {}
}
