import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseAsync('memories.db');

export const initDatabase = async () => {
    (await db).withExclusiveTransactionAsync(async () => {
        (await db).runAsync(
            `CREATE TABLE IF NOT EXISTS items (
                id INTEGER PRIMARY KEY NOT NULL,
                title TEXT NOT NULL,
                description TEXT NOT NULL,
                date TEXT NOT NULL
            );`
        );    
    });
};

export const getDatabase = async () => {
    return db;
};
