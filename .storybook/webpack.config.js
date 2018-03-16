const webpackConfig = require("./../config/webpack.config.dev");

module.exports = (storybookBaseConfig, configType) => {
  storybookBaseConfig.module.rules = storybookBaseConfig.module.rules.concat(
    webpackConfig.module.rules
  );

  return storybookBaseConfig;
};
