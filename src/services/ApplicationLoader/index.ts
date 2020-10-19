import service from "@ioc/mappings/service";
import Localization from "services/Localization";
import * as SplashScreen from "expo-splash-screen";
import { observable, runInAction } from "mobx";
import FontLoader from "components/utils/FontLoader";
import DataManagement from "services/DataManagement";
import Logging, { Logger } from "services/Logging";
import Authentication from "services/Authentication";
import LocationManager from "services/LocationManager";

@service("ApplicationLoader")
export default class ApplicationLoader {
  @observable loadingCompleted: boolean = false;
  @observable loadingCompletedWithError: Error | null = null;
  private readonly logger: Logger;

  constructor(
    private readonly localization: Localization,
    private readonly fontLoader: FontLoader,
    private readonly data: DataManagement,
    private readonly auth: Authentication,
    private readonly location: LocationManager,
    logging: Logging
  ) {
    this.logger = logging.get(ApplicationLoader);
  }

  public async load() {
    await SplashScreen.preventAutoHideAsync();
    runInAction(() => (this.loadingCompleted = false));
    let loadingError: Error | null = null;
    try {
      await Promise.all(this.parallelStream);
      this.logger.trace("Finished executing parallel stream.");
      await this.sequentialStream();
      this.logger.trace("Finished executing sequential stream.");
    } catch (e) {
      this.logger.error("Application loaded with error", e);
      loadingError = e;
    } finally {
      runInAction(() => {
        this.logger.trace("Setting loading completed.");
        this.loadingCompletedWithError = loadingError;
        this.loadingCompleted = true;
      });
      //TODO this error shall be handled somehow
      await SplashScreen.hideAsync();
    }
  }

  private get parallelStream() {
    return [this.localization.init(), this.fontLoader.load(), this.data.init()];
  }

  private async sequentialStream() {
    await this.location.requestPermission();
    await this.auth.signIn();
    await this.location.startLocationUpdates();
    // E.g.
    // await Promise.resolve();
    // [...]
    // await Promise.resolve();
  }
}
