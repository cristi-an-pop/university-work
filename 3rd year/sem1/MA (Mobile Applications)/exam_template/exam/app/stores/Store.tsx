import { create } from 'zustand';
import { Item } from '../models/Item';
import Repository from '../repository/Repository';
import wsService from './WebSocketStore';

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
            const newItem = await Repository.createItem(item);
            set((state) => ({ items: [...state.items, newItem] }));
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
            const updatedItem = await Repository.updateItem(item);
            if (updatedItem) {
                set((state) => ({ items: state.items.map((i) => (i.id === item.id ? updatedItem : i)) }));
            }
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
            set((state) => ({ items: state.items.filter((item) => item.id !== id) }));
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
                set((state) => ({ items: state.items.filter((item) => item.id !== operation.data) }));
                Repository.deleteItemLocal(operation.data);
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