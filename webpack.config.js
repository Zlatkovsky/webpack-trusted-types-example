const path = require("path");

const commonOptions = {
  mode: "production",
  optimization: {
    minimize: false,
  },
  entry: "./dynamic-content/main.js",
};

module.exports = [
  // First, the no-policy config:
  {
    ...commonOptions,
    output: {
      chunkLoadingGlobal: "webpackChunkNoPolicy",
      path: path.resolve(__dirname, "dist/no-policy"),
    },
  },

  // Then, a config that requires trusted types:
  {
    ...commonOptions,
    output: {
      trustedTypes: {
        policyName: "DynamicCode",
      },
      chunkLoadingGlobal: "webpackChunkTrustedTypesPolicy",
      path: path.resolve(__dirname, "dist/trusted-types-policy"),
    },
  },
];
