import { createNativeStackNavigator } from "react-native-screens/native-stack";
import { TabOneParamList } from "ui/navigation/types";
import React from "react";
import DashBoard from "@screen/Dashboard";

const TabOneStack = createNativeStackNavigator<TabOneParamList>();

export function DashboardTabNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="TabOneScreen"
        component={DashBoard}
        options={{ headerTitle: "In Use" }}
      />
    </TabOneStack.Navigator>
  );
}
