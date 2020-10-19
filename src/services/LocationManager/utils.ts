import { ILocationCoordinates } from "services/LocationManager/types";
import convert from "convert-units";
import { AccuracyMinima } from "services/LocationManager/options";
import { INVALID_STRING_MARKER } from "constants/Display";


export function coordinatesToSpeedString(coordinates: ILocationCoordinates) {
  if (coordinates.speed === null) {
    return INVALID_STRING_MARKER;
  }
  if (coordinates.speed < 0) {
    return INVALID_STRING_MARKER;
  }
  const speedInKmh = convert(coordinates.speed).from("m/s").to("km/h");
  return speedInKmh.toFixed(1);
}

export function coordinatesToAltitudeString(coordinates: ILocationCoordinates) {
  if (coordinates.altitudeAccuracy === null) {
    return INVALID_STRING_MARKER;
  }
  if (coordinates.altitude === null) {
    return INVALID_STRING_MARKER;
  }
  if (coordinates.altitudeAccuracy > AccuracyMinima.altitude) {
    return INVALID_STRING_MARKER;
  }
  return coordinates.altitude.toFixed();
}
