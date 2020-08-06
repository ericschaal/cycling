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
            "@components": "./src/components",
            "@entity": "./src/models/entity",
            "@services": "./src/services",
            "@configuration": "./src/configuration",
            "@utils": "./src/utils",
            "@ioc": "./src/utils/ioc",
            "@ui": "./src/ui",
            "@constants": "./src/constants",
          },
        },
      ],
    ],
  };
};
