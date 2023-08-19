import type { Config } from 'jest';
import dotenv from 'dotenv';
dotenv.config({ path: './.env.test' });

const config: Config = {
  verbose: false,
  silent: false,
  preset: 'ts-jest',
  testEnvironment: 'node',
  testTimeout: 60000,
};

export default config;
