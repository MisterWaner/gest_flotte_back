import { connection } from "../data/dbConnection.js";
import { RowDataPacket, FieldPacket } from "mysql2/promise";

type QueryResult<T> = [T[], FieldPacket[]];

export const insert = async (
    tableName: string,
    data: object
): Promise<void> => {
    try {
        const keys = Object.keys(data);
        const values = Object.values(data);
        const placeholders = keys.map(() => "?").join(", ");

        await connection.query(
            `INSERT INTO ${tableName}(${keys.join(
                ", "
            )}) VALUES(${placeholders})`,
            values
        );
    } catch (error) {
        console.log(error);
    }
};

export const findOne = async (
    tableName: string,
    id: number
): Promise<RowDataPacket> => {
    const [rows]: QueryResult<RowDataPacket> = await connection.query(
        `SELECT * FROM ${tableName} WHERE id = ?`,
        [id]
    );
    return rows[0];
};

export const findAll = async (tableName: string): Promise<RowDataPacket[]> => {
    const [rows]: QueryResult<RowDataPacket> = await connection.query(
        `SELECT * FROM ${tableName}`
    );
    return rows;
};

export const updateOne = async (
    tableName: string,
    id: number,
    data: object
): Promise<void> => {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const assignments = keys.map((key) => `${key} = ?`).join(", ");

    await connection.query(
        `UPDATE ${tableName} SET ${assignments} WHERE id = ?`,
        [...values, id]
    );
};

export const deleteOne = async (
    tableName: string,
    id: number
): Promise<void> => {
    await connection.query(`DELETE FROM ${tableName} WHERE id = ?`, [id]);
};
