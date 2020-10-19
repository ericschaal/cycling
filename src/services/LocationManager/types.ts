import { LocationObject } from "expo-location";

export interface ILocationUpdateEvent {
  data: { locations: LocationObject[] };
  error: Error;
}

export interface ILocationCoordinates {
  latitude: number;
  longitude: number;
  altitude: number | null;
  accuracy: number | null;
  altitudeAccuracy: number | null;
  heading: number | null;
  speed: number | null;
}
