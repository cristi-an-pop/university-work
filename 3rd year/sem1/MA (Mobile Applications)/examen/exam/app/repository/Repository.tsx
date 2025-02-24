import axios from 'axios';
import { Config } from '../../config/config';
import { Book } from '../models/Book';
import { getDatabase } from '../utils/DatabaseUitls';
import Toast from 'react-native-toast-message';

const API_URL = Config.API_URL;

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 5000,
});

const handleError = (error: any, operation: string) => {
    console.info(`Error during ${operation}:`, error);
    const message = error.response?.data?.message || 'An unexpected error occurred';
    Toast.show({
        type: 'error',
        text1: 'Error',
        text2: message,
    });
};

const Repository = {
    getAllBooks: async (): Promise<Book[]> => {
        try {
            console.log('Fetching all books');
            const response = await axiosInstance.get('/books');
            console.info('Fetched books successfully');
            return response.data;
        } catch (error) {
            handleError(error, 'fetching books');
            return [];
        }
    },
    getBook: async (id: number): Promise<Book> => {
        try {
            console.log('Fetching book', id);
            const response = await axiosInstance.get(`/book/${id}`);
            console.info('Fetched book successfully');
            return response.data;
        } catch (error) {
            handleError(error, 'fetching book');
            return {} as Book;
        }
    },
    createBook: async (book: Omit<Book, 'id'>): Promise<void> => {
        try {
            console.log('Creating new book:', book);
            await axiosInstance.post('/book', book);
            console.info('Book created successfully');
        } catch (error) {
            handleError(error, 'creating book');
        }
    },
    updateBook: async (book: Book): Promise<void> => {
        try {
            console.log('Updating book:', book);
            await axiosInstance.put('/book', book);
            console.info('Book updated successfully');
        } catch (error) {
            handleError(error, 'updating book');
        }
    },
    getBooks2: async (): Promise<Book[]> => {
        try {
            console.log('Fetching all books');
            const response = await axiosInstance.get('/allBooks');
            console.info('Fetched books successfully');
            return response.data;
        } catch (error) {
            handleError(error, 'fetching books');
            return [];
        }
    },
    getAllBooksLocal: async (): Promise<Book[]> => {
        try {
            const db = getDatabase();
            const books = await (await db).getAllAsync<Book>('SELECT * FROM books');
            return books;
        } catch (error) {
            handleError(error, 'fetching local books');
            return [];
        }
    },
    createBookLocal: async (book: Book): Promise<void> => {
        try {
            const db = getDatabase();
            (await db).runAsync('INSERT INTO books (id, title, author, genre, status, reviewCount, avgRating) VALUES (?, ?, ?, ?, ?, ?, ?)', [book.id, book.title, book.author, book.genre, book.status, book.reviewCount, book.avgRating]);
        } catch (error) {
            handleError(error, 'creating local book');
        }
    },
    updateBookLocal: async (book: Book): Promise<void> => {
        try {
            const db = getDatabase();
            (await db).runAsync('UPDATE books SET title = ?, author = ?, genre = ?, status = ?, reviewCount = ?, avgRating = ? WHERE id = ?', [book.title, book.author, book.genre, book.status, book.reviewCount, book.avgRating, book.id]);
        } catch (error) {
            handleError(error, 'updating local book');
        }
    },
    deleteAllBooksLocal: async (): Promise<void> => {
        try {
            const db = getDatabase();
            (await db).runAsync('DELETE FROM books');
        } catch (error) {
            handleError(error, 'deleting all local books');
        }
    }
};

export default Repository;