import { create } from 'zustand';
import { Memory } from '../models/Memory';
import MemoryRepository from '../repository/MemoryRepository';
import WebSocketService from '../service/WebSocketService';
import { getStateFromPath } from '@react-navigation/native';

type MemoryStore = {
    memories: Memory[];
    isOffline: boolean;
    pendingOperations: Set<string>;
    addPendingOperation: (operationId: string) => void;
    removePendingOperation: (operationId: string) => void;
    setMemories: (memories: Memory[]) => void;
    addMemory: (memory: Omit<Memory, 'id'>) => void;
    updateMemory: (memory: Memory) => void;
    deleteMemory: (id: string) => void;
    fetchMemories: () => void;
    handleWebSocketMessage: (message: any) => void;
};

export const useMemoryStore = create<MemoryStore>((set) => ({
    memories: [],
    isOffline: false,
    pendingOperations: new Set(),
    addPendingOperation: (operationId) => set((state) => ({ pendingOperations: state.pendingOperations.add(operationId) })),
    removePendingOperation: (operationId) => set((state) => {
      state.pendingOperations.delete(operationId);
      return { pendingOperations: new Set(state.pendingOperations) };
    }),
    setMemories: (memories) => set({ memories }),
    addMemory: async (memory) => {
      const operationId = `create-${Date.now()}`;
      set((state) => {
        state.addPendingOperation(operationId);
        return {};
      });
      try {
        const newMemory = await MemoryRepository.createMemory(memory, operationId);
        set((state) => ({ memories: [...state.memories, newMemory] }));
      } catch (error) {
        console.error("Error creating memory", error);
      } finally {
        set((state) => {
          state.removePendingOperation(operationId);
          return {};
        });
      }
    },
    updateMemory: async (memory) => {
      const operationId = `update-${Date.now()}`;
      set((state) => {
        state.addPendingOperation(operationId);
        return {};
      });
      try {
        const updatedMemory = await MemoryRepository.updateMemory(memory, operationId);
        if (updatedMemory) {
          console.log("Updated memory", updatedMemory);
          set((state) => ({ memories: state.memories.map((m) => (m.id === memory.id ? memory : m))}));
        }
      } catch (error) {
        console.error("Error updating memory", error);
      } finally {
        set((state) => {
          state.removePendingOperation(operationId);
          return {};
        });
      }
    },
    deleteMemory: async (id) => {
      const operationId = `delete-${Date.now()}`;
      set((state) => {
        state.addPendingOperation(operationId);
        return {};
      });
      try {
        await MemoryRepository.deleteMemory(id, operationId);
        set((state) => ({ memories: state.memories.filter((m) => m.id !== id) }));
      } catch (error) {
        console.error("Error deleting memory", error);
      } finally {
        set((state) => {
          state.removePendingOperation(operationId);
          return {};
        });
      }
    },
    fetchMemories: async () => {
        try {
            const memories = await MemoryRepository.getAllMemories();
            set({ memories });
        } catch (error) {
            console.error("Error fetching memories", error);
        }
    },
    handleWebSocketMessage: (message: any) => {
      const { type, data, operationId } = message;
      
      set((state) => {
        if (state.pendingOperations.has(operationId)) return state;

        switch (type) {
          case 'CREATE':
            return { memories: [...state.memories, data] };
          case 'UPDATE':
            console.log('Updating memory', data);
            return {
              memories: state.memories.map((m) => (m.id === data.id ? data : m))
            };
          case 'DELETE':
            return { memories: state.memories.filter((m) => m.id !== data) };
          default:
            console.error('Unknown message type', message);
            return state;
        }
      });
    }
}));
