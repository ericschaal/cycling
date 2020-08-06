import HTTP from "@components/HTTP";
import WebSocket from "@components/WebSocket";
import component from "@ioc/mappings/component";

@component("MeasurementNetworkResource")
export default class MeasurementNetworkResource {
  constructor(public http: HTTP, private ws: WebSocket) {}
}
