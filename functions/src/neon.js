import { neon } from "@neondatabase/serverless";
const sql = neon(`postgresql://neondb_owner:npg_T30OKVzuFYAH@ep-odd-sky-a4hvlwqf-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require`);
export { sql };