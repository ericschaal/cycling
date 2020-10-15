import React from "react";
import LoginScreenStore from "@screen/Login/store";
import { LinearGradient } from "expo-linear-gradient";
import { container } from "tsyringe";
import Authentication from "services/Authentication";
import { StyleService } from "@ui-kitten/components";
import { View } from "react-native";
import { observer } from "mobx-react";
import UIConfiguration from "configuration/UIConfiguration";

const uiConfig = container.resolve(UIConfiguration);

@observer
export default class LoginScreen extends React.PureComponent {
  public static Name = "LoginScreen";
  private readonly store: LoginScreenStore = new LoginScreenStore();
  private readonly auth: Authentication = container.resolve(Authentication);

  constructor(props: {}, context: any) {
    super(props, context);
  }

  render() {
    return (
      <LinearGradient
        colors={[uiConfig.uiTheme["color-primary-400"], uiConfig.uiTheme["color-primary-500"]]}
        start={[0.0, 0.05]}
        style={styles.container}
      >
        <View style={styles.formContainer}>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleService.create({
  container: {
    flex: 1
  },
  textInputStyle: {
    backgroundColor: "rgba(255,255,255, 0.1)",
    width: "100%",
    padding: 10,
    color: "black"
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    width: "70%"
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
