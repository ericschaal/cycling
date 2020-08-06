import NetworkConfiguration from "configuration/NetworkConfiguration";
import component from "@ioc/mappings/component";

@component("WebSocket")
export default class WebSocket {
  constructor(private readonly config: NetworkConfiguration) {}
}
