import React from "react";
import { observer } from "mobx-react";
import { Text } from "@ui-kitten/components";
import { SafeAreaView } from "react-native-safe-area-context";

@observer
export default class DashBoard extends React.Component {
  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <Text>Welcome</Text>
        <Text>Welcome</Text>
      </SafeAreaView>
    );
  }
}
