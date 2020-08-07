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
    if (this._isSignedIn) {
      throw new Error("Already signed in.");
    }
    await this.network.userAccount.login("eschaaal", "sludge196");
    this._isSignedIn = true;
  }
  public async signOut() {
    this._isSignedIn = false;
  }
}
