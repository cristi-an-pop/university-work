import axios from 'axios';
import { Alert } from 'react-native';
import { Config } from '../../config/config';
import { Item } from '../models/Item';
import { getDatabase } from '../utils/DatabaseUitls';
import { create } from 'zustand';

const API_URL = Config.API_URL;

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 5000,
});

const handleError = (error: any, operation: string) => {
    console.error(`Error during ${operation}:`, error);
    const message = error.response?.data?.message || 'An unexpected error occurred';
    Alert.alert('Error', message);
    throw error;
};

const Repository = {
    getAllItems: async (): Promise<Item[]> => {
        try {
            console.log('Fetching all items');
            const response = await axiosInstance.get('/items');
            console.info('Fetched items successfully');
            return response.data;
        } catch (error) {
            return handleError(error, 'fetching items');
        }
    },
    createItem: async (item: Omit<Item, 'id'>): Promise<Item> => {
        try {
            console.log('Creating new item:', item);
            const response = await axiosInstance.post('/item', item);
            Repository.createItemLocal(response.data);
            console.info('Item created successfully:', response.data);
            return response.data;
        } catch (error) {
            return handleError(error, 'creating item');
        }
    },
    updateItem: async (updatedItem: Item): Promise<Item | null> => {
        try {
            console.log('Updating item:', updatedItem);
            const response = await axiosInstance.put(`/item/${updatedItem.id}`, updatedItem);
            Repository.updateItemLocal(updatedItem);
            console.info('Item updated successfully:', updatedItem);
            return updatedItem;
        } catch (error) {
            return handleError(error, 'updating item');
        }
    },
    deleteItem: async (id: number) => {
        try {
            console.log('Deleting item:', id);
            await axiosInstance.delete(`/item/${id}`);
            Repository.deleteItemLocal(id);
            console.info('Item deleted successfully');
        } catch (error) {
            return handleError(error, 'deleting item');
        }
    },
    getAllItemsLocal: async (): Promise<Item[]> => {
        const db = getDatabase();
        const items = (await db).getAllAsync<Item>('SELECT * FROM items');
        return items;
    },
    createItemLocal: async (item: Item) => {
        const db = getDatabase();
        await (await db).runAsync('INSERT INTO items (id, title, description, date) VALUES (?, ?, ?, ?)', [item.id, item.title, item.description, item.date]);
    },
    updateItemLocal: async (item: Item) => {
        const db = getDatabase();
        await (await db).runAsync('UPDATE items SET title = ?, description = ?, date = ? WHERE id = ?', [item.title, item.description, item.date, item.id]);
    },
    deleteItemLocal: async (id: number) => {
        const db = getDatabase();
        await (await db).runAsync('DELETE FROM items WHERE id = ?', [id]);
    },
    deleteAllItemsLocal: async () => {
        const db = getDatabase();
        await (await db).runAsync('DELETE FROM items');
    }
};

export default Repository;