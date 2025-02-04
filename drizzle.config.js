  /** @type { import("drizzle-kit").Config} */

export default {
 schema: './configs/schema.js',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://neo_owner:npg_s4Gtj1wUIlug@ep-jolly-base-a5z97g0r-pooler.us-east-2.aws.neon.tech/neo?sslmode=require',
  }
};
