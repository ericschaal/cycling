import * as React from "react";
import {
  ViewProps as DefaultViewProps,
  View as DefaultView,
} from "react-native";
import { container } from "tsyringe";
import UIConfiguration from "@configuration/UIConfiguration";
const uiConfiguration = container.resolve(UIConfiguration);

type ViewProps = { lightColor?: string; darkColor?: string } & DefaultViewProps;

export default class View extends React.PureComponent<ViewProps> {
  render() {
    const { style, lightColor, darkColor, ...rest } = this.props;
    const backgroundColor = uiConfiguration.useColorFromTheme(
      { light: lightColor, dark: darkColor },
      "background"
    );
    return <DefaultView style={[{ backgroundColor }, style]} {...rest} />;
  }
}
