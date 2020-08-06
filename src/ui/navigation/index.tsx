import { NavigationContainer, Theme } from "@react-navigation/native";
import React from "react";
import LinkingConfiguration from "ui/navigation/LinkingConfiguration";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import { RootStackParamList } from "ui/navigation/types";
import DrawerNavigator from "ui/navigation/DrawerNavigator";
import NotFoundScreen from "@screen/NotFoundScreen";
import { container } from "tsyringe";
import Authentication from "services/Authentication";
import { computed } from "mobx";
import * as eva from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import LoginScreen from "@screen/Login";
import UIConfiguration from "configuration/UIConfiguration";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default class NavigationRoot extends React.PureComponent {
  private readonly auth = container.resolve(Authentication);
  private readonly uiConfig = container.resolve(UIConfiguration);

  @computed
  private get screensForCurrentAuthenticationStatus() {
    if (!this.auth.isSignedIn) {
      return (
        <>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ title: "Login", headerShown: false }}
          />
        </>
      );
    } else {
      return (
        <>
          <Stack.Screen name="Root" component={DrawerNavigator} />
          <Stack.Screen
            name="NotFound"
            component={NotFoundScreen}
            options={{ title: "Oops!" }}
          />
        </>
      );
    }
  }

  render() {
    return (
      <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={this.uiConfig.uiTheme}>
          <NavigationContainer
            linking={LinkingConfiguration}
            theme={this.uiConfig.navigationTheme}
          >
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              {this.screensForCurrentAuthenticationStatus}
            </Stack.Navigator>
          </NavigationContainer>
        </ApplicationProvider>
      </>
    );
  }
}
