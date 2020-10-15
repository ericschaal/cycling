import service from "@ioc/mappings/service";
import i18next, { TOptions } from "i18next";
import LocalizationConfiguration from "@configuration/LocalizationConfiguration";

@service("Localization")
export default class Localization {
  constructor(private config: LocalizationConfiguration) {
  }

  public async init() {
    await i18next
      .use(this.config.languageDetector)
      .use(this.config.translationLoader)
      .init({
        fallbackLng: this.config.fallbackLanguage,
        ns: this.config.namespaces,
        interpolation: {
          escapeValue: false
        }
      });
  }

  public t(key: string, option: TOptions) {
    return i18next.t(key, option);
  }

  public get locale() {
    return i18next.language;
  }
}
