import { observable } from "mobx";
import Network from "@services/Network";
import service from "@ioc/mappings/service";

@service("Authentication")
export default class Authentication {
  @observable private _isSignedIn: boolean = false;

  constructor(private network: Network) {}

  public get isSignedIn() {
    return this._isSignedIn;
  }

  public async signIn() {
    this._isSignedIn = true;
  }
  public async signOut() {
    this._isSignedIn = false;
  }
}
