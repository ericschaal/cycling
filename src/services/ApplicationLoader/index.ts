import service from "@ioc/mappings/service";
import Localization from "services/Localization";
import * as SplashScreen from "expo-splash-screen";
import { observable, runInAction } from "mobx";
import FontLoader from "components/FontLoader";
import DataManagement from "services/DataManagement";

@service("ApplicationLoader")
export default class ApplicationLoader {
  @observable loadingCompleted: boolean = false;
  @observable loadingCompletedWithError: Error | null = null;

  constructor(
    private localization: Localization,
    private fontLoader: FontLoader,
    private data: DataManagement
  ) {}

  public async load() {
    await SplashScreen.preventAutoHideAsync();
    runInAction(() => (this.loadingCompleted = false));
    let loadingError: Error | null = null;
    try {
      await Promise.all(this.parallelStream());
      await this.sequentialStream();
    } catch (e) {
      loadingError = e;
    } finally {
      runInAction(() => {
        this.loadingCompletedWithError = loadingError;
        this.loadingCompleted = true;
      });
      await SplashScreen.hideAsync();
    }
  }

  private parallelStream() {
    return [this.localization.init(), this.fontLoader.load(), this.data.init()];
  }

  private async sequentialStream() {
    // E.g.
    // await Promise.resolve();
    // [...]
    // await Promise.resolve();
  }
}
