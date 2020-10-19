import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";
import { BottomTabParamList } from "../types";
import { container } from "tsyringe";
import UIConfiguration from "configuration/UIConfiguration";
import { DashboardTabNavigator } from "ui/navigation/TabNavigation/Tabs/DashboardTab";
import TabBarIcon from "ui/navigation/TabNavigation/TabBarIcon";


const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default class BottomTabNavigator extends React.PureComponent {
  private uiConfig = container.resolve(UIConfiguration);


  render() {
    return (
      <BottomTab.Navigator
        initialRouteName="Dashboard"
        tabBarOptions={{ activeTintColor: this.uiConfig.colors.tint }}
      >
        <BottomTab.Screen
          name="Dashboard"
          component={DashboardTabNavigator}
          options={{
            title: "Dashboard",
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="dashboard" color={color}/>
            )
          }}
        />
      </BottomTab.Navigator>
    );
  }
}
