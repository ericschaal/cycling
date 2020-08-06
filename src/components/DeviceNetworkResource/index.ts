import HTTP from "@components/HTTP";
import WebSocket from "@components/WebSocket";
import component from "@ioc/mappings/component";

@component("DeviceNetworkResource")
export default class DeviceNetworkResource {
  constructor(public http: HTTP, private ws: WebSocket) {}
}
