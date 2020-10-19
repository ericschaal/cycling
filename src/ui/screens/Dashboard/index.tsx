import React from "react";
import { observer } from "mobx-react";
import { Card, Layout, Text } from "@ui-kitten/components";
import { container } from "tsyringe";
import CoordinatesStore from "ui/stores/CoordinatesStore";
import { computed } from "mobx";
import { StyleSheet, View } from "react-native";
import {
  coordinatesToAltitudeString,
  coordinatesToSpeedString,
} from "services/LocationManager/utils";
import { INVALID_STRING_MARKER } from "constants/Display";

const Header = (props: { title: string }) => (
  <View {...props}>
    <Text style={{ textAlign: "center" }} category="h3">
      {props.title}
    </Text>
  </View>
);
const headerWithTitle = (title: any) => () => <Header title={title} />;

@observer
export default class DashBoard extends React.Component {
  private readonly coordinatesStore: CoordinatesStore = container.resolve(
    CoordinatesStore
  );

  @computed private get currentSpeed() {
    const lastCoordinates = this.coordinatesStore.last;
    if (lastCoordinates === undefined) {
      return INVALID_STRING_MARKER;
    } else {
      return coordinatesToSpeedString(lastCoordinates);
    }
  }

  @computed private get currentAltitude() {
    const lastCoordinates = this.coordinatesStore.last;
    if (lastCoordinates && lastCoordinates.altitude !== null) {
      return coordinatesToAltitudeString(lastCoordinates);
    } else {
      return INVALID_STRING_MARKER;
    }
  }

  @computed private get currentAccuracy() {
    return this.coordinatesStore.currentAccuracy;
  }

  render() {
    return (
      <>
        <Layout style={styles.topContainer} level="1">
          <Card style={styles.card} header={headerWithTitle("Speed")}>
            <Text category="s1" style={{ textAlign: "center" }}>
              {this.currentSpeed} km/h
            </Text>
          </Card>

          <Card style={styles.card} header={headerWithTitle("Altitude")}>
            <Text category="s1" style={{ textAlign: "center" }}>
              {this.currentAltitude} m
            </Text>
          </Card>
        </Layout>
        <Layout style={styles.topContainer} level="1">
          <Card
            style={styles.card}
            header={headerWithTitle("Altitude Accuracy")}
          >
            <Text category="s1" style={{ textAlign: "center" }}>
              {this.currentAccuracy.altitude?.toFixed(1) ?? INVALID_STRING_MARKER} m
            </Text>
          </Card>
          <Card style={styles.card} header={headerWithTitle("Location Accuracy")}>
            <Text category="s1" style={{ textAlign: "center" }}>
              {this.currentAccuracy.accuracy?.toFixed(1) ?? INVALID_STRING_MARKER} m
            </Text>
          </Card>
        </Layout>
      </>
    );
  }
}

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: "row",
    marginVertical: 12,
    justifyContent: "space-between",
  },
  card: {
    flex: 1,
    margin: 2,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  footerControl: {
    marginHorizontal: 2,
  },
});
