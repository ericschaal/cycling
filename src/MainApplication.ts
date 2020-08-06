import "@abraham/reflection";
import { registerRootComponent } from "expo";
import App from "App";
import { container } from "tsyringe";
import { enableScreens } from "react-native-screens";
import ApplicationLoader from "services/ApplicationLoader";
import Logging from "services/Logging";

enableScreens();
const loader = container.resolve(ApplicationLoader);
const logging = container.resolve(Logging);

registerRootComponent(App);

loader.load().then(() => {
  logging.global().info("Application loaded.");
});
