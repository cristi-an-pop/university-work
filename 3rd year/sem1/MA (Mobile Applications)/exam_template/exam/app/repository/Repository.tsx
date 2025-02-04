import axios from 'axios';
import { Alert } from 'react-native';
import { Config } from '../../config/config';
import { Item } from '../models/Item';
import { getDatabase } from '../utils/DatabaseUitls';

const API_URL = Config.API_URL;

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 5000,
});

const handleError = (error: any, operation: string) => {
    console.info(`Error during ${operation}:`, error);
    const message = error.response?.data?.message || 'An unexpected error occurred';
    Alert.alert('Error', message);
};

const Repository = {
    getAllItems: async (): Promise<Item[]> => {
        try {
            console.log('Fetching all items');
            const response = await axiosInstance.get('/items');
            console.info('Fetched items successfully');
            return response.data;
        } catch (error) {
            handleError(error, 'fetching items');
            return [];
        }
    },
    createItem: async (item: Omit<Item, 'id'>): Promise<void> => {
        try {
            console.log('Creating new item:', item);
            await axiosInstance.post('/item', item);
            console.info('Item created successfully');
        } catch (error) {
            handleError(error, 'creating item');
        }
    },
    updateItem: async (updatedItem: Item): Promise<void> => {
        try {
            console.log('Updating item:', updatedItem);
            await axiosInstance.put(`/item/${updatedItem.id}`, updatedItem);
            console.info('Item updated successfully');
        } catch (error) {
            handleError(error, 'updating item');
        }
    },
    deleteItem: async (id: number): Promise<void> => {
        try {
            console.log('Deleting item:', id);
            await axiosInstance.delete(`/item/${id}`);
            console.info('Item deleted successfully');
        } catch (error) {
            handleError(error, 'deleting item');
        }
    },
    getAllItemsLocal: async (): Promise<Item[]> => {
        try {
            const db = getDatabase();
            const items = await (await db).getAllAsync<Item>('SELECT * FROM items');
            return items;
        } catch (error) {
            handleError(error, 'fetching local items');
            return [];
        }
    },
    createItemLocal: async (item: Item): Promise<void> => {
        try {
            const db = getDatabase();
            await (await db).runAsync('INSERT INTO items (id, title, description, date) VALUES (?, ?, ?, ?)', [item.id, item.title, item.description, item.date]);
        } catch (error) {
            handleError(error, 'creating local item');
        }
    },
    updateItemLocal: async (item: Item): Promise<void> => {
        try {
            const db = getDatabase();
            await (await db).runAsync('UPDATE items SET title = ?, description = ?, date = ? WHERE id = ?', [item.title, item.description, item.date, item.id]);
        } catch (error) {
            handleError(error, 'updating local item');
        }
    },
    deleteItemLocal: async (id: number): Promise<void> => {
        try {
            const db = getDatabase();
            await (await db).runAsync('DELETE FROM items WHERE id = ?', [id]);
        } catch (error) {
            handleError(error, 'deleting local item');
        }
    },
    deleteAllItemsLocal: async (): Promise<void> => {
        try {
            const db = getDatabase();
            await (await db).runAsync('DELETE FROM items');
        } catch (error) {
            handleError(error, 'deleting all local items');
        }
    }
};

export default Repository;