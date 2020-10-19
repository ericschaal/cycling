import store from "@ioc/mappings/store";
import _ from "lodash";
import { action, computed, observable } from "mobx";
import { ILocationCoordinates } from "services/LocationManager/types";

@store("CoordinatesStore")
export default class CoordinatesStore {
  @observable.shallow private readonly coordinates: ILocationCoordinates[] = [];
  @observable private _lastUpdated: number | null = null;

  @action
  public append(coordinates: ILocationCoordinates, timestamp: number) {
    this.coordinates.push(coordinates);
    this._lastUpdated = timestamp;
  }

  @computed
  public get last() {
    return _.last(this.coordinates);
  }

  public get lastUpdated() {
    return this._lastUpdated;
  }

  @computed
  public get currentAccuracy() {
    const last = this.last;
    if (last === undefined) {
      return {
        altitude: null,
        accuracy: null,
      };
    } else {
      return {
        altitude: last.altitudeAccuracy,
        accuracy: last.accuracy,
      };
    }
  }
}
