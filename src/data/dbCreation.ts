import { connection } from "./dbConnection.js";
import { config } from "dotenv";
config();

const { DB_NAME } = process.env;

export const createDb = async () => {
    try {
        await connection.query(
            `CREATE DATABASE IF NOT EXISTS ${DB_NAME}`
        )
        console.log(`Database ${DB_NAME} created`)
    } catch (error) {
        console.log(error)
    }
}