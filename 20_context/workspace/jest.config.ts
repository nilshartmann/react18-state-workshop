import type { JestConfigWithTsJest } from "ts-jest";
const config: JestConfigWithTsJest = {
  moduleFileExtensions: [
    "js",
    "json",
    "jsx",
    "mjs",
    "svelte",
    "ts",
    "tsx",
    "vue",
  ],
  extensionsToTreatAsEsm: [".jsx", ".svelte", ".ts", ".tsx", ".vue"],
  transform: {
    // '^.+\\.[tj]sx?$' to process js/ts with `ts-jest`
    // '^.+\\.m?[tj]sx?$' to process js/ts/mjs/mts with `ts-jest`
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        useESM: true,
        diagnostics: { ignoreCodes: ["TS151001"] },
      },
    ],
  },
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/test/__mocks__/fileMock.js",
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
};

export default config;
