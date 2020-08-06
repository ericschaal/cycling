import { DarkTheme, DefaultTheme, Theme } from "@react-navigation/native";
import { Appearance } from "react-native";
import { computed, observable } from "mobx";
import { autobind } from "core-decorators";
import AppearancePreferences = Appearance.AppearancePreferences;
import configuration from "@ioc/mappings/configuration";
import Colors from "@constants/Colors";

@configuration("UIConfiguration")
export default class UIConfiguration {
  @observable private colorScheme: "light" | "dark";

  constructor() {
    this.colorScheme = "light";
    //Appearance.addChangeListener(this.onColorSchemeChanged);
  }

  @autobind
  private onColorSchemeChanged(preference: AppearancePreferences) {
    this.colorScheme = preference.colorScheme ?? "light";
  }

  private get darkTheme(): Theme {
    return {
      ...DarkTheme,
      colors: {
        ...DarkTheme.colors,
        primary: this.darkColors.primary,
      },
    };
  }

  private get lightTheme(): Theme {
    return {
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        primary: this.lightColors.primary,
      },
    };
  }

  private get darkColors() {
    return Colors.dark;
  }

  private get lightColors() {
    return Colors.light;
  }

  @computed
  public get theme() {
    switch (this.colorScheme) {
      case "dark":
        return this.darkTheme;
      case "light":
        return this.lightTheme;
      default:
        return this.lightTheme;
    }
  }

  @computed
  public get colors() {
    switch (this.colorScheme) {
      case "dark":
        return this.darkColors;
      case "light":
        return this.lightColors;
      default:
        return this.lightColors;
    }
  }

  public useColorFromTheme(
    props: { light?: string; dark?: string },
    colorName: keyof typeof Colors.light & keyof typeof Colors.dark
  ) {
    const colorFromProps = props[this.colorScheme];
    if (colorFromProps) {
      return colorFromProps;
    } else {
      return this.colors[colorName];
    }
  }
}
