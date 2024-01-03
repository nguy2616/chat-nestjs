module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  roots: ['<rootDir>'],
  testRegex: '.*\\.spec\\.ts$',
  moduleDirectories: ['node_modules', '<rootDir>'],
  preset: 'ts-jest',
  coverageReporters: ['html', 'text', 'text-summary', 'cobertura'],
  collectCoverageFrom: ['**/src/modules/**/*.service.ts'],
  coveragePathIgnorePatterns: [
    '<rootDir>/dist/',
    // 'src/modules/http',
    // 'src/modules/kafka',
  ],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  coverageDirectory: './coverage',
  testEnvironment: 'node',
};
