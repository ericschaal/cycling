import "@abraham/reflection";
import { registerRootComponent } from "expo";
import App from "App";
import { container } from "tsyringe";
import { enableScreens } from "react-native-screens";
import ApplicationLoader from "services/ApplicationLoader";
import Logging from "services/Logging";
import LocationManager from "services/LocationManager";

enableScreens();

const location = container.resolve(LocationManager);

location.registerBGTask();

registerRootComponent(App);

const logging = container.resolve(Logging);
const loader = container.resolve(ApplicationLoader);

loader.load().then(() => {
  logging.global().info("Application loaded.");
});
