import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import BottomTabNavigator from "ui/navigation/TabNavigation/BottomTabNavigator";
import { Dimensions } from "react-native";
import { DrawerContent } from "ui/navigation/DrawerNavigation/DrawerContent";
import { DrawerIcon } from "ui/navigation/DrawerNavigation/DrawerIcon";

const Drawer = createDrawerNavigator();
export default class DrawerNavigator extends React.PureComponent {
  render() {
    return (
      <Drawer.Navigator
        drawerContent={DrawerContent}
        drawerType="slide"
        initialRouteName={"Main"}
        edgeWidth={Dimensions.get("window").width}
      >
        <Drawer.Screen
          options={{
            drawerIcon: ({ color }) => (
              <DrawerIcon name="ios-medical" color={color}/>
            )
          }}
          name={"Main"}
          component={BottomTabNavigator}
        />
      </Drawer.Navigator>
    );
  }
}


