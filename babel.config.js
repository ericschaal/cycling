module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"],
          extensions: [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".json"],
          alias: {
            tests: ["./tests/"],
            "@assets": "./assets",
            "@ioc": "./src/utils/ioc",
            "@entity": "./src/models/entity",
            "@screen": "./src/ui/screens",
            "@components": "./src/components",
            "@services": "./src/services",
            "@configuration": "./src/configuration",
            "@utils": "./src/utils",
            "@ui": "./src/ui",
            "@constants": "./src/constants",
          },
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};
