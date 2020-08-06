import component from "@ioc/mappings/component";
import HTTP from "components/network/clients/HTTP";
import WebSocket from "components/network/clients/WebSocket";

@component("OrganizationNetworkResource")
export default class OrganizationNetworkResource {
  constructor(private readonly http: HTTP, private readonly ws: WebSocket) {}

  public async getOrganization() {}

}