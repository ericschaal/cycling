import { action, observable } from "mobx";

export default class LoginScreenStore {
  @observable private _usernameInput: string = "";
  @observable private _passwordInput: string = "";


  @action
  public setUsernameInput(username: string) {
    this._usernameInput = username;
  }

  @action
  public setPasswordInput(password: string) {
    this._passwordInput = password;
  }

  get usernameInput(): string {
    return this._usernameInput;
  }

  get passwordInput(): string {
    return this._passwordInput;
  }
}