import component from "@ioc/mappings/component";
import * as TaskManager from "expo-task-manager";
import { BGTaskName } from "./BGTaskName";
import Logging, { Logger } from "services/Logging";

@component("BGTaskManager")
export default class BGTaskManager {
  private readonly logger: Logger;

  constructor(logging: Logging) {
    this.logger = logging.get(BGTaskManager);
  }

  public registerTask(
    name: BGTaskName,
    executor: TaskManager.TaskManagerTaskExecutor
  ) {
    this.logger.debug(`Defining new background task with name ${name}`);
    TaskManager.defineTask(name, executor);
  }

  public async unregisterTask(name: BGTaskName) {
    await TaskManager.unregisterTaskAsync(name);
    this.logger.debug(`Unregistered background task with name ${name}`);
  }

  public isTaskDefined(name: BGTaskName) {
    return TaskManager.isTaskDefined(name);
  }

}
