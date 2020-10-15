import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList
} from "@react-navigation/drawer";
import { Linking } from "react-native";
import React from "react";
import { DrawerIcon } from "ui/navigation/DrawerNavigation/DrawerIcon";

export function DrawerContent(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        icon={({ color }) => (
          <DrawerIcon name="ios-help-circle" color={color}/>
        )}
        label="Help"
        onPress={() => Linking.openURL("https://mywebsite.com/help")}
      />
      <DrawerItem
        icon={({ color }) => <DrawerIcon name="ios-construct" color={color}/>}
        label="Settings"
        onPress={() => Linking.openURL("https://mywebsite.com/help")}
      />
      <DrawerItem
        icon={({ color }) => <DrawerIcon name="ios-log-out" color={color}/>}
        label="Logout"
        onPress={() => Linking.openURL("https://mywebsite.com/help")}
      />
    </DrawerContentScrollView>
  );
}
