module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  moduleNameMapper: {
    // Handle CSS/SCSS imports
    "\\.(css|scss)$": "<rootDir>/__mocks__/styleMock.js",
    "\\.module\\.(css|scss)$": "<rootDir>/__mocks__/styleMock.js",
    // Handle image imports
    "\\.(jpg|jpeg|png|gif|svg)$": "<rootDir>/__mocks__/fileMock.js",
  },
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  coveragePathIgnorePatterns: ["/node_modules/", "/__tests__/", "/dist/"],
};
