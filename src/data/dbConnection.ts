import mysql from "mysql2/promise";
import { config } from "dotenv";

config();

export const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: Number(process.env.DB_PORT),
});
