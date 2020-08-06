import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import Navigation from "ui/navigation";
import { container } from "tsyringe";
import UIConfiguration from "configuration/UIConfiguration";
import { observer } from "mobx-react";
import ApplicationLoader from "services/ApplicationLoader";

const uiConfig = container.resolve(UIConfiguration);

@observer
export default class App extends React.PureComponent {
  private loader = container.resolve(ApplicationLoader);

  render() {
    if (this.loader.loadingCompleted) {
      return (
        <SafeAreaProvider>
          <Navigation theme={uiConfig.theme} />
          <StatusBar />
        </SafeAreaProvider>
      );
    } else {
      return null;
    }
  }
}

// export default function App() {
//   const isLoadingComplete = useCachedResources();
//
//   if (!isLoadingComplete) {
//     return null;
//   } else {
//     return (
//       <SafeAreaProvider>
//         <Navigation theme={uiConfig.theme} />
//         <StatusBar />
//       </SafeAreaProvider>
//     );
//   }
// }
