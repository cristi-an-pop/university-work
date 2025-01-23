import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseAsync('memories.db');

export const initDatabase = async () => {
    (await db).withExclusiveTransactionAsync(async () => {
        (await db).execAsync(
            `CREATE TABLE IF NOT EXISTS memories (
                id TEXT PRIMARY KEY NOT NULL,
                title TEXT NOT NULL,
                description TEXT NOT NULL,
                date TEXT NOT NULL,
                location TEXT NOT NULL,
                mood TEXT NOT NULL,
                tags TEXT NOT NULL
            );`
        );    
    });
};

export const getDatabase = async () => {
    return db;
};

