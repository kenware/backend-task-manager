import dotenv from 'dotenv';

dotenv.config();
const { env } = process;

export default {
  APP_SECRET: env.APP_SECRET || 'test-app-secrete-25487k85hf7',
};
