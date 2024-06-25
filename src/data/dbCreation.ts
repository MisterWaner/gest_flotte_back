import { connection } from "./dbConnection.js";
import { config } from "dotenv";
config();

const { DB_NAME } = process.env;

export const createDb = async () => {
    try {
        await connection.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME};`);
        console.log(`Database ${DB_NAME} created`);
        await connection.query(`USE ${DB_NAME};`);

        await connection.query(`CREATE TABLE IF NOT EXISTS plan(
            id INTEGER PRIMARY KEY AUTO_INCREMENT,
            title VARCHAR(100) NOT NULL,
            description VARCHAR(255) NOT NULL,
            price INTEGER(3) NOT NULL
        )`);
        await connection.query(`CREATE TABLE IF NOT EXISTS company(
            id INTEGER PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(100) NOT NULL,
            city VARCHAR(100) NOT NULL,
            sector VARCHAR(100) NOT NULL,
            planId INTEGER NOT NULL,
            size INTEGER NOT NULL,
            FOREIGN KEY (planId) REFERENCES plan(id) ON DELETE CASCADE ON UPDATE CASCADE
        )`);
        await connection.query(`CREATE TABLE IF NOT EXISTS user(
            id INTEGER PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) NOT NULL,
            password VARCHAR(100) NOT NULL,
            phoneNumber VARCHAR(25) NOT NULL,
            companyId INTEGER NOT NULL, 
            FOREIGN KEY (companyId) REFERENCES company(id) ON DELETE CASCADE ON UPDATE CASCADE
        )`);

        await connection.query(`CREATE TABLE IF NOT EXISTS product(
            id INTEGER PRIMARY KEY AUTO_INCREMENT,
            type VARCHAR(100) NOT NULL
        )`);

        await connection.query(`CREATE TABLE IF NOT EXISTS companyProduct(
            id INTEGER PRIMARY KEY AUTO_INCREMENT,
            companyId INTEGER NOT NULL,
            productId INTEGER NOT NULL,
            quantity INTEGER NOT NULL,
            FOREIGN KEY (companyId) REFERENCES company(id) ON DELETE CASCADE ON UPDATE CASCADE,
            FOREIGN KEY (productId) REFERENCES product(id) ON DELETE CASCADE ON UPDATE CASCADE
        )`);

        await connection.query(`CREATE TABLE IF NOT EXISTS phone(
            id INTEGER PRIMARY KEY AUTO_INCREMENT,
            brand VARCHAR(100) NOT NULL,
            model VARCHAR(100) NOT NULL,
            imei VARCHAR(25) NOT NULL,
            network VARCHAR(100) NOT NULL,
            price INTEGER(3) NOT NULL,
            number VARCHAR(25) NOT NULL,
            owner VARCHAR(100) NOT NULL,
            productId INTEGER NOT NULL,
            companyId INTEGER NOT NULL,
            FOREIGN KEY (productId) REFERENCES product(id) ON DELETE CASCADE ON UPDATE CASCADE,
            FOREIGN KEY (companyId) REFERENCES company(id) ON DELETE CASCADE ON UPDATE CASCADE
        )`);

        await connection.query(`CREATE TABLE IF NOT EXISTS computer(
            id INTEGER PRIMARY KEY AUTO_INCREMENT,
            brand VARCHAR(100) NOT NULL,
            model VARCHAR(100) NOT NULL,
            price INTEGER(3) NOT NULL,
            owner VARCHAR(100) NOT NULL,
            productId INTEGER NOT NULL,
            companyId INTEGER NOT NULL,
            FOREIGN KEY (productId) REFERENCES product(id) ON DELETE CASCADE ON UPDATE CASCADE,
            FOREIGN KEY (companyId) REFERENCES company(id) ON DELETE CASCADE ON UPDATE CASCADE
        )`);

        await connection.query(`CREATE TABLE IF NOT EXISTS car(
            id INTEGER PRIMARY KEY AUTO_INCREMENT,
            brand VARCHAR(100) NOT NULL,
            model VARCHAR(100) NOT NULL,
            immatriculation VARCHAR(25) NOT NULL,
            kilometers INTEGER NOT NULL,
            motor VARCHAR(50) NOT NULL,
            driver VARCHAR(100) NOT NULL,
            price INTEGER(6) NOT NULL,
            productId INTEGER NOT NULL,
            companyId INTEGER NOT NULL,
            FOREIGN KEY (productId) REFERENCES product(id) ON DELETE CASCADE ON UPDATE CASCADE,
            FOREIGN KEY (companyId) REFERENCES company(id) ON DELETE CASCADE ON UPDATE CASCADE
        )`);
    } catch (error) {
        console.log(error);
    }
};
