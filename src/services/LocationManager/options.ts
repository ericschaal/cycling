import {
  LocationAccuracy,
  LocationActivityType,
  LocationTaskOptions,
} from "expo-location";

export const LocationManagerOptions: LocationTaskOptions = {
  accuracy: LocationAccuracy.BestForNavigation,
  activityType: LocationActivityType.Fitness,
  pausesUpdatesAutomatically: true,
};

export const AccuracyMinima = {
  altitude: 10,
  location: 10,
};
