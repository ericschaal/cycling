import { createNativeStackNavigator } from "react-native-screens/native-stack";
import { DashboardParamList } from "ui/navigation/types";
import React from "react";
import DashBoard from "@screen/Dashboard";

const TabOneStack = createNativeStackNavigator<DashboardParamList>();

export function DashboardTabNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="Dashboard"
        component={DashBoard}
        options={{ headerTitle: "In Use" }}
      />
    </TabOneStack.Navigator>
  );
}
