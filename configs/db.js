import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

const sql = neon('postgresql://neo_owner:npg_s4Gtj1wUIlug@ep-jolly-base-a5z97g0r-pooler.us-east-2.aws.neon.tech/neo?sslmode=require');
  export const db = drizzle( sql );