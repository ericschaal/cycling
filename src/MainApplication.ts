import "reflect-metadata";
import { registerRootComponent } from "expo";
import App from "App";
import { container } from "tsyringe";
import { enableScreens } from "react-native-screens";
import ApplicationLoader from "services/ApplicationLoader";
import Logging from "services/Logging";

enableScreens();

const loader = container.resolve(ApplicationLoader);
const logging = container.resolve(Logging);

loader.load().then(() => {
  logging.global().log("Application loaded.");
});




registerRootComponent(App);
