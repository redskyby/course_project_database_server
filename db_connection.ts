import mysql from "mysql2/promise";
import { config } from "dotenv";
config();

const pool = mysql.createPool({
    host: process.env.HOST!,
    user: process.env.USER!,
    database: process.env.DATABASE!,
    password: process.env.PASSWORD!,
    // port : process.env.PORT_DB!
});

export default pool;
