const path = require("path");

const commonOptions = {
  mode: "production",
  optimization: {
    minimize: false,
  },
  entry: "./src/dynamic-content/main.js",
};

module.exports = [
  // First, the no-policy config:
  {
    ...commonOptions,
    output: {
      chunkLoadingGlobal: "webpackChunkNoPolicy",
      path: path.resolve(__dirname, "dist/dynamic-content/no-policy"),
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
      path: path.resolve(__dirname, "dist/dynamic-content/trusted-types-policy-regular"),
    },
  },

  // Finally, a config that allows for continuing on error:
  {
    ...commonOptions,
    output: {
      trustedTypes: {
        policyName: "DynamicCode",
        onPolicyCreationFailure: "continue"
      },
      chunkLoadingGlobal: "webpackChunkTrustedTypesPolicyContinueOnError",
      path: path.resolve(__dirname, "dist/dynamic-content/trusted-types-policy-continue-on-error"),
    },
  },
];
