/** @type {import("jest").Config} */
module.exports = {
  preset: "ts-jest",
  roots: ["<rootDir>/src"],
  collectCoverage: true,
  collectCoverageFrom: ["**/*.ts"],
  coverageProvider: "v8",
  testEnvironment: "node",
};
