import HTTP from "components/network/clients/HTTP";
import WebSocket from "components/network/clients/WebSocket";
import component from "@ioc/mappings/component";

@component("MeasurementNetworkResource")
export default class MeasurementNetworkResource {
  constructor(private readonly http: HTTP, private readonly ws: WebSocket) {}
}
