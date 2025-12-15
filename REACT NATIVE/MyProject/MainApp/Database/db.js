import * as SQLite from 'expo-sqlite';

export const openDB = async () => {
    try {
        const db = await SQLite.openDatabaseAsync('ecommerce_db');
        return db;
    } catch (error) {
        console.error("Error opening database:", error);
        throw error; // Re-throw the error to be caught by initDB
    }
};
