import { create } from 'zustand';
import { Item } from '../models/Item';
import Repository from '../repository/Repository';
import WebSocketService from '../services/WebSocketService';

const wsService = WebSocketService.getInstance();

type ItemStore = {
    items: Item[];
    loading: boolean;
    isOffline: boolean;
    setItems: (items: Item[]) => void;
    setLoading: (loading: boolean) => void;
    setOffline: (offline: boolean) => void;
    addItem: (item: Omit<Item, 'id'>) => void;
    updateItem: (item: Item) => void;
    deleteItem: (id: number) => void;
    fetchItems: () => void;
    handleWebSocketMessage: (message: any) => void;
    retryConnection: () => void;
};

export const useItemStore = create<ItemStore>((set) => ({
    items: [],
    loading: false,
    isOffline: false,
    setItems: (items) => set({ items }),
    setLoading: (loading) => set({ loading }),
    setOffline: (offline) => set({ isOffline: offline }),
    addItem: async (item) => {
        if (!wsService.isServerConnected()) {
            alert('You are offline. Cannot add items.');
            return;
        }
        set({ loading: true });
        try {
            await Repository.createItem(item);
        } catch (error) {
            console.error('Error adding item:', error);
        } finally {
            set({ loading: false});
        }
    },
    updateItem: async (item) => {
        if (!wsService.isServerConnected()) {
            alert('You are offline. Cannot update items.');
            return;
        }
        set({ loading: true });
        try {
            await Repository.updateItem(item);
        } catch (error) {
            console.error('Error updating item:', error);
        } finally {
            set({ loading: false });
        }
    },
    deleteItem: async (id) => {
        if (!wsService.isServerConnected()) {
            alert('You are offline. Cannot delete items.');
            return;
        }
        set({ loading: true });
        try {
            await Repository.deleteItem(id);
        } catch (error) {
            console.error('Error deleting item:', error);
        } finally {
            set({ loading: false });
        }
    },
    fetchItems: async () => {
        set({ loading: true });
        try {
            let items;
            if (wsService.isServerConnected()) {
                await Repository.deleteAllItemsLocal();
                items = await Repository.getAllItems();
                await Promise.all(items.map(item => Repository.createItemLocal(item)));
            } else {
                items = await Repository.getAllItemsLocal();
            }
            set({ items });
        } catch (error) {
            console.error('Error fetching items:', error);
        } finally {
            set({ loading: false });
        }
    },
    handleWebSocketMessage: (message) => {
        const operation = message;
        switch (operation.type) {
            case 'CREATE':
                set((state) => ({ items: [...state.items, operation.data] }));
                Repository.createItemLocal(operation.data);
                break;
            case 'UPDATE':
                set((state) => ({ items: state.items.map((item) => (item.id === operation.data.id ? operation.data : item)) }));
                Repository.updateItemLocal(operation.data);
                break;
            case 'DELETE':
                set((state) => ({ items: state.items.filter((item) => item.id !== Number(operation.data)) }));
                Repository.deleteItemLocal(Number(operation.data));
                break;
        }
    },
    retryConnection: () => {
        wsService.connect();
    }
}));

wsService.setMessageHandler(useItemStore.getState().handleWebSocketMessage);

wsService.setConnectionHandler(() => {
    useItemStore.getState().setOffline(false);
    useItemStore.getState().fetchItems();
});

wsService.setOfflineHandler(() => {
    useItemStore.getState().setOffline(true);
});