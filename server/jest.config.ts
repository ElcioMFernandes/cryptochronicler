import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  preset: 'ts-jest/presets/default-esm',
  verbose: true,
  testEnvironment: 'node',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  transform: {}, // Mantém vazio, necessário para ESM
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1'
  },
};

export default config;
