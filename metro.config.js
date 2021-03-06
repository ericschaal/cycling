const MetroConfig = require('@ui-kitten/metro-config');

const evaConfig = {
  evaPackage: '@eva-design/eva',
  customMappingPath: './assets/ui/eva-mapping.json',
};

module.exports = MetroConfig.create(evaConfig, {
  transformer: {
    babelTransformerPath: require.resolve(
      "react-native-typescript-transformer"
    ),
  },
});