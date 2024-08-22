const webpack = require("webpack");

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // 폴리필 설정
      webpackConfig.resolve.fallback = {
        buffer: require.resolve("buffer/"),
        timers: require.resolve("timers-browserify"),
        // 다른 필요한 폴리필이 있다면 추가
      };

      // 플러그인 설정
      webpackConfig.plugins = (webpackConfig.plugins || []).concat([
        new webpack.ProvidePlugin({
          Buffer: ["buffer", "Buffer"],
        }),
      ]);

      return webpackConfig;
    },
  },
};
