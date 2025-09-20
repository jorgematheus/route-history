const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
    testMatch: [
      '**/route-history.service.spec.ts'
    ],
    transformIgnorePatterns: [
      'node_modules/(?!@angular|rxjs)'
    ],
};