const { when, whenDev, whenProd, whenTest, ESLINT_MODES, POSTCSS_MODES } = require("@craco/craco");

module.exports = {
  webpack: {
    configure: webpackConfig => {
      const scopePluginIndex = webpackConfig.resolve.plugins.findIndex(
        ({ constructor }) => constructor && constructor.name === 'ModuleScopePlugin'
      );

      webpackConfig.resolve.plugins.splice(scopePluginIndex, 1);
      return webpackConfig;
    }
  }
};
