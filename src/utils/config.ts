export const config = {
  NODE_ENV: process.env.NODE_ENV,
  AUTH_SECRET: process.env.AUTH_SECRET,
  SALT_ROUNDS: 10,
  ONE_DAY: 86_400, // 60 * 60 * 24
};
