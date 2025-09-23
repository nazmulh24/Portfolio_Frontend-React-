const path = require("path");

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      // Ignore source map warnings for specific packages
      webpackConfig.ignoreWarnings = [
        {
          module: /node_modules\/@mediapipe/,
        },
        {
          module: /node_modules\/three-mesh-bvh/,
        },
        {
          module: /node_modules\/@react-three/,
        },
        function ignoreSourceMapWarnings(warning) {
          return (
            warning.module &&
            warning.module.resource &&
            warning.module.resource.includes("node_modules") &&
            warning.details &&
            warning.details.includes("source map")
          );
        },
      ];

      // Disable source map warnings for third-party modules
      if (webpackConfig.module && webpackConfig.module.rules) {
        webpackConfig.module.rules.push({
          test: /\.m?js$/,
          include: /node_modules/,
          type: "javascript/auto",
          resolve: {
            fullySpecified: false,
          },
        });
      }

      return webpackConfig;
    },
  },
};