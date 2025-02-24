import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseAsync('books123.db');

export const initDatabase = async () => {
    (await db).withExclusiveTransactionAsync(async () => {
        (await db).runAsync(
            `CREATE TABLE IF NOT EXISTS books (
                id INTEGER PRIMARY KEY NOT NULL,
                title TEXT NOT NULL,
                author TEXT NOT NULL,
                genre TEXT NOT NULL,
                status TEXT NOT NULL,
                reviewCount INTEGER NOT NULL,
                avgRating REAL NOT NULL
            );`
        );    
    });
};

export const getDatabase = async () => {
    return db;
};