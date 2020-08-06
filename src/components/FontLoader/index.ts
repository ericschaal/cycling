import component from "@ioc/mappings/component";
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import {
  Roboto_400Regular,
  Roboto_300Light,
  Roboto_100Thin,
} from '@expo-google-fonts/roboto';

@component("FontLoader")
export default class FontLoader {

  public async load() {
    await Font.loadAsync({
      ...Ionicons.font,
      "roboto-regular": Roboto_400Regular,
      "roboto-light": Roboto_300Light,
      "roboto-thin": Roboto_100Thin,
      'space-mono': require('../../../assets/fonts/SpaceMono-Regular.ttf'),
    });
  }

}