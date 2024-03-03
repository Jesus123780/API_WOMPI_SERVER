import type { Config } from 'jest'

export default async (): Promise<Config> => {
  return {
    verbose: true,
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    transform: {
      '^.+\\.tsx?$': 'ts-jest'
    },
    testMatch: ['**/tests/**/*.test.ts']
  }
}
