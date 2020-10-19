import service from "../../utils/ioc/mappings/service";
import Logging, { Logger } from "services/Logging";
import * as Location from "expo-location";
import _ from "lodash";
import { autobind } from "core-decorators";
import BGTaskManager from "components/scheduler/BGTasks/BGTaskManager";
import { BGTaskName } from "components/scheduler/BGTasks/BGTaskName";
import { LocationManagerOptions } from "services/LocationManager/options";
import { ILocationUpdateEvent } from "services/LocationManager/types";
import CoordinatesStore from "ui/stores/CoordinatesStore";

@service("LocationManager")
export default class LocationManager {
  private readonly logger: Logger;

  constructor(
    logging: Logging,
    private readonly taskManager: BGTaskManager,
    private readonly coordinatesStore: CoordinatesStore
  ) {
    this.logger = logging.get(LocationManager);
  }

  public async requestPermission() {
    return Location.requestPermissionsAsync();
  }

  private async isPermissionGranted() {
    const permission = await Location.getPermissionsAsync();
    return permission.granted;
  }

  public registerBGTask() {
    this.taskManager.registerTask(
      BGTaskName.LocationUpdate,
      // @ts-ignore
      this.onLocationUpdateReceived
    );
  }

  public unregisterBGTask() {
    return this.taskManager.unregisterTask(BGTaskName.LocationUpdate);
  }

  public async startLocationUpdates() {
    if (await this.isPermissionGranted()) {
      if (this.isLocationUpdateTaskDefined) {
        await Location.startLocationUpdatesAsync(
          BGTaskName.LocationUpdate,
          LocationManagerOptions
        );
        this.logger.info("Started location updates.");
      } else {
        throw new Error(
          "Failed to start location updates. Background task not defined."
        );
      }
    } else {
      throw new Error(
        "Failed to start location updates. Permission not granted."
      );
    }
  }

  public async stopLocationUpdates() {
    if (await this.hasStartedLocationUpdates()) {
      return Location.stopLocationUpdatesAsync(BGTaskName.LocationUpdate);
    } else {
      this.logger.warn("Location updates not started. This is a no-op.");
    }
  }

  private async hasStartedLocationUpdates() {
    return Location.hasStartedLocationUpdatesAsync(BGTaskName.LocationUpdate);
  }

  @autobind
  private onLocationUpdateReceived({
    data: { locations },
    error,
  }: ILocationUpdateEvent) {
    if (error) {
      this.logger.error(error);
    } else {
      const lastUpdate = _.last(locations);
      if (lastUpdate) {
        this.coordinatesStore.append(lastUpdate.coords, lastUpdate.timestamp);
        this.logger.debug(
          `Received location update event. Timestamp diff: ${Math.abs(
            lastUpdate.timestamp - Date.now()
          )}`
        );
      } else {
        this.logger.warn("Received empty location update.");
      }
    }
  }

  private get isLocationUpdateTaskDefined() {
    return this.taskManager.isTaskDefined(BGTaskName.LocationUpdate);
  }
}
