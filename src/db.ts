import { config } from './config.ts';
import { MysqlClient } from './deps.ts';

const client = new MysqlClient()
export const db = await client.connect({
    username: config.dbusername,
    password: config.dbpassword,
    db: config.db,
    hostname: config.dbhost,
    port: config.dbport || 3306,
    poolSize: 10,
})
