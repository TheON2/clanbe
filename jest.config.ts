import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

module.exports = {
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest", // .js, .jsx, .ts, .tsx 파일을 Babel로 변환
  },
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  testEnvironment: "jsdom", // 브라우저 환경 모방을 위한 jsdom 설정
  moduleNameMapper: {
    "^next-auth/react$": "<rootDir>/node_modules/next-auth/react",
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transformIgnorePatterns: [
    "/node_modules/(?!next-auth).+\\.js$", // next-auth 모듈을 변환하도록 설정
  ],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
