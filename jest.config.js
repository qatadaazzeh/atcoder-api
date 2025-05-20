module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/__tests__/**/*.test.ts'],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov'],
    // Setup files for test environment
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    // Exclude mock files from being treated as test suites
    testPathIgnorePatterns: ['/node_modules/', '/__tests__/mocks.ts'],
};
