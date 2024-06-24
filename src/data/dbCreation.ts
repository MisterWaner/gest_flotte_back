import { connection } from "./dbConnection.js";
import { config } from "dotenv";
config();

const { DB_NAME, DB_NAME_2 } = process.env;

export const createDb = async () => {
    try {
        await connection.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`);
        console.log(`Database ${DB_NAME} created`);
        await connection.query(`USE ${DB_NAME}`);

        await connection.query(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) NOT NULL,
            password VARCHAR(100) NOT NULL,
            phoneNumber VARCHAR(25) NOT NULL,
            companyId INTEGER NOT NULL, 
            FOREIGN KEY (companyId) REFERENCES company(id) ON DELETE CASCADE ON UPDATE CASCADE,
        )`);

        await connection.query(`CREATE TABLE IF NOT EXISTS company (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name VARCHAR(100) NOT NULL,
            city VARCHAR(100) NOT NULL,
            sector VARCHAR(100) NOT NULL,
            plan VARCHAR(100) NOT NULL,
            size INTEGER NOT NULL,
        )`);

        await connection.query(`CREATE TABLE IF NOT EXISTS plan (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title VARCHAR(100) NOT NULL,
            description VARCHAR(255) NOT NULL,
            price INTEGER(3) NOT NULL,
        )`);

        await connection.query(`CREATE TABLE IF NOT EXISTS product (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            type VARCHAR(100) NOT NULL,
        )`);

        await connection.query(`CREATE TABLE IF NOT EXISTS userProduct (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userId INTEGER NOT NULL FOREIGN KEY REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
            productId INTEGER NOT NULL FOREIGN KEY REFERENCES product(id) ON DELETE CASCADE ON UPDATE CASCADE,
            quantity INTEGER NOT NULL,
            FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
            FOREIGN KEY (productId) REFERENCES product(id) ON DELETE CASCADE ON UPDATE CASCADE,
        )`);
    } catch (error) {
        console.log(error);
    }
};

export const createProductDb = async () => {
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME_2}`);
    console.log(`Database ${DB_NAME_2} created`);
    await connection.query(`USE ${DB_NAME_2}`);

    await connection.query(`CREATE TABLE IF NOT EXISTS phone(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        brand VARCHAR(100) NOT NULL,
        model VARCHAR(100) NOT NULL,
        imei VARCHAR(25) NOT NULL,
        network VARCHAR(100) NOT NULL,
        price INTEGER(3) NOT NULL,
        number VARCHAR(25) NOT NULL,
        owner VARCHAR(100) NOT NULL,
        productId INTEGER NOT NULL,
        FOREIGN KEY (productId) REFERENCES ${DB_NAME}.product(id) ON DELETE CASCADE ON UPDATE CASCADE,
    )`);
};
