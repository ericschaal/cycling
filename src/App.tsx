import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigation from "ui/navigation";
import { container } from "tsyringe";
import { observer } from "mobx-react";
import ApplicationLoader from "services/ApplicationLoader";

@observer
export default class App extends React.PureComponent {
  private loader = container.resolve(ApplicationLoader);

  render() {
    if (this.loader.loadingCompleted) {
      return <Navigation />;
    } else {
      return null;
    }
  }
}
