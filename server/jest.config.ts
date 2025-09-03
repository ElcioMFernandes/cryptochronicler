import type { JestConfigWithTsJest } from "ts-jest";

const config: JestConfigWithTsJest = {
  preset: "ts-jest/presets/default-esm",
  verbose: true,
  collectCoverage: true,
  testEnvironment: "node",
  coverageDirectory: "coverage",
  extensionsToTreatAsEsm: [".ts"],
  transform: {},
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
};

export default config;
