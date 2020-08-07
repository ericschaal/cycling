import {
  DarkTheme,
  DefaultTheme as DefaultNavigatorTheme,
  Theme as NavigatorTheme,
} from "@react-navigation/native";
import { Appearance } from "react-native";
import { computed, observable } from "mobx";
import { autobind } from "core-decorators";
import AppearancePreferences = Appearance.AppearancePreferences;
import configuration from "@ioc/mappings/configuration";
import Colors from "@constants/Colors";
import { default as brandingTheme } from "@assets/ui/eva-theme.json";
import * as eva from "@eva-design/eva";

@configuration("UIConfiguration")
export default class UIConfiguration {
  @observable private _colorScheme: "light" | "dark";
  private overrideColorScheme: "light" | "dark" | null = "light";

  private darkNavigatorTheme: NavigatorTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: Colors.dark.primary,
    },
  };

  private lightNavigatorTheme: NavigatorTheme = {
    ...DefaultNavigatorTheme,
    colors: {
      ...DefaultNavigatorTheme.colors,
      primary: Colors.light.primary,
    },
  };

  constructor() {
    if (this.overrideColorScheme) {
      this._colorScheme = this.overrideColorScheme;
    } else {
      this._colorScheme = Appearance.getColorScheme() ?? "light";
      Appearance.addChangeListener(this.onColorSchemeChanged);
    }
  }

  @autobind
  private onColorSchemeChanged(preference: AppearancePreferences) {
    this._colorScheme = preference.colorScheme ?? "light";
  }

  @computed
  public get uiTheme() {
    const base = this._colorScheme === "light" ? eva.light : eva.dark;
    return {
      ...base,
      ...brandingTheme,
    };
  }

  @computed
  public get navigationTheme() {
    switch (this._colorScheme) {
      case "dark":
        return this.darkNavigatorTheme;
      case "light":
        return this.lightNavigatorTheme;
      default:
        return this.lightNavigatorTheme;
    }
  }

  @computed
  public get colors() {
    switch (this._colorScheme) {
      case "dark":
        return Colors.dark;
      case "light":
        return Colors.light;
      default:
        return Colors.light;
    }
  }

  public useColorFromTheme(
    props: { light?: string; dark?: string },
    colorName: keyof typeof Colors.light & keyof typeof Colors.dark
  ) {
    const colorFromProps = props[this._colorScheme];
    if (colorFromProps) {
      return colorFromProps;
    } else {
      return this.colors[colorName];
    }
  }

  get colorScheme(): "light" | "dark" {
    return this._colorScheme;
  }
}
