import React from "react";
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import BottomTabNavigator from "ui/navigation/BottomTabNavigator";
import { Text, View } from "ui/components";
import { Dimensions, Linking } from "react-native";
import Animated from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { container } from "tsyringe";
const Drawer = createDrawerNavigator();


export default class DrawerNavigator extends React.PureComponent {
  render() {
    return (
      <Drawer.Navigator
        drawerContent={CustomDrawerContent}
        drawerType="slide"
        initialRouteName={"Main"}
        edgeWidth={Dimensions.get("window").width}
      >
        <Drawer.Screen
          options={{
            drawerIcon: ({ color }) => (
              <DrawerIcon name="ios-medical" color={color} />
            ),
          }}
          name={"Devices"}
          component={BottomTabNavigator}
        />
      </Drawer.Navigator>
    );
  }
}

function DrawerIcon(props: { name: string; color: string }) {
  return <Ionicons size={26} style={{ marginBottom: -3 }} {...props} />;
}

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const translateX = Animated.interpolate(props.progress, {
    inputRange: [0, 1],
    outputRange: [-100, 0],
  });

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        icon={({ color }) => (
          <DrawerIcon name="ios-help-circle" color={color} />
        )}
        label="Help"
        onPress={() => Linking.openURL("https://mywebsite.com/help")}
      />
      <DrawerItem
        icon={({ color }) => <DrawerIcon name="ios-construct" color={color} />}
        label="Settings"
        onPress={() => Linking.openURL("https://mywebsite.com/help")}
      />
      <DrawerItem
        icon={({ color }) => <DrawerIcon name="ios-log-out" color={color} />}
        label="Logout"
        onPress={() => Linking.openURL("https://mywebsite.com/help")}
      />
    </DrawerContentScrollView>
  );
}

function TestComponent() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Hello World</Text>
    </View>
  );
}
