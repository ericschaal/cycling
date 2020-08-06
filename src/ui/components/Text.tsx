import * as React from "react";
import {
  Text as DefaultText,
  TextProps as DefaultTextProps,
} from "react-native";
import { observer } from "mobx-react";
import { container } from "tsyringe";
import UIConfiguration from "@configuration/UIConfiguration";
import {Roboto_400Regular} from '@expo-google-fonts/roboto';

const uiConfiguration = container.resolve(UIConfiguration);

type TextProps = { lightColor?: string; darkColor?: string } & DefaultTextProps;

@observer
export default class Text extends React.PureComponent<TextProps> {
  render() {
    const { style, lightColor, darkColor, ...rest } = this.props;
    const color = uiConfiguration.useColorFromTheme(
      { light: lightColor, dark: darkColor },
      "text"
    );
    return <DefaultText style={[{ color: color, fontFamily: "roboto-regular" }, style]} {...rest} />;
  }
}
