import { action, observable } from "mobx";

export default class TestStore {

  @observable name: string = "this is my name";


  @action
  public setName(newName: string) {
    this.name = newName;
  }

}