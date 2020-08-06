import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import TabOneScreen from "@ui/screens/TabOneScreen";
import TabTwoScreen from "@ui/screens/TabTwoScreen";
import {
  BottomTabParamList,
  TabOneParamList,
  TabTwoParamList,
} from "./types";
import { container } from "tsyringe";
import UIConfiguration from "configuration/UIConfiguration";
import { createNativeStackNavigator } from "react-native-screens/native-stack";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default class BottomTabNavigator extends React.PureComponent {
  private uiConfig = container.resolve(UIConfiguration);
  render() {
    return (
      <BottomTab.Navigator
        initialRouteName="InUse"
        tabBarOptions={{ activeTintColor: this.uiConfig.colors.tint }}
      >
        <BottomTab.Screen
          name="InUse"
          component={TabOneNavigator}
          options={{
            title: "In Use",
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="ios-pulse" color={color} />
            ),
          }}
        />
        <BottomTab.Screen
          name="Used"
          component={TabTwoNavigator}
          options={{
            title: "Used",
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="ios-more" color={color} />
            ),
          }}
        />
      </BottomTab.Navigator>
    );
  }
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createNativeStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="TabOneScreen"
        component={TabOneScreen}
        options={{ headerTitle: "In Use" }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{ headerTitle: "Used" }}
      />
    </TabTwoStack.Navigator>
  );
}
