import React from "react";
import Navigation from "ui/navigation";
import { container } from "tsyringe";
import { observer } from "mobx-react";
import ApplicationLoader from "services/ApplicationLoader";

@observer
export default class App extends React.PureComponent {
  private loader = container.resolve(ApplicationLoader);

  render() {
    if (this.loader.loadingCompleted) {
      return <Navigation/>;
    } else {
      return null;
    }
  }
}
