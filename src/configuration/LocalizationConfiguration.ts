import configuration from "@ioc/mappings/configuration";
import * as ExpoLocalization from "expo-localization";
import { BackendModule, LanguageDetectorModule, ReadCallback, ResourceKey } from "i18next";

enum LocalizationNamespace {
  COMMON = "common",
  LOGIN = "login",
}

enum SupportedLocaleNames {
  FR = "fr",
  EN = "us",
}

interface ILocalLoader {
  translationFileLoader: () => Record<LocalizationNamespace, ResourceKey>;
  momentLocaleLoader: () => any;
}

@configuration("LocalizationConfiguration")
export default class LocalizationConfiguration {
  public readonly defaultNamespace = LocalizationNamespace.COMMON;
  public readonly fallbackLanguage = SupportedLocaleNames.EN;

  public get languageDetector(): LanguageDetectorModule {
    return {
      type: "languageDetector",
      detect(): string | undefined {
        // We will get back a string like "en-US". We
        // return a string like "en" to match our language
        // files.
        return ExpoLocalization.locale.split("-")[0];
      },
      init: () => {
      },
      cacheUserLanguage: () => {
      }
    };
  }

  public get translationLoader(): BackendModule {
    return {
      type: "backend",
      init: () => {
      },
      read: (
        language: SupportedLocaleNames,
        namespace: LocalizationNamespace,
        callback: ReadCallback
      ) => {
        let resource,
          error = null;
        try {
          resource = this.supportedLocales[language].translationFileLoader()[
            namespace
            ];
          callback(null, resource);
        } catch (e) {
          callback(e, false);
        }
      },
      create: () => {
      }
    };
  }

  public get namespaces() {
    return Array.from(Object.values(LocalizationNamespace));
  }

  private get supportedLocales(): Record<SupportedLocaleNames, ILocalLoader> {
    return {
      [SupportedLocaleNames.EN]: {
        translationFileLoader: () => require("../../assets/lang/en.json"),
        momentLocaleLoader: () => Promise.resolve()
      },
      [SupportedLocaleNames.FR]: {
        translationFileLoader: () => require("../../assets/lang/fr.json"),
        momentLocaleLoader: () => require("moment/locale/fr")
      }
    };
  }
}
