import { Memory } from '../models/Memory';
import axios from 'axios';
import { Alert } from 'react-native';

const API_URL = 'http://192.168.37.184:5000/api/memories';

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

const handleError = (error: any, operation: string) => {
  console.error(`Error during ${operation}:`, error);
  const message = error.response?.data?.message || 'An unexpected error occurred';
  Alert.alert('Error', message);
  throw error;
};

const MemoryRepository = {
  getAllMemories: async (): Promise<Memory[]> => {
    try {
      console.log('Fetching all memories');
      const response = await axiosInstance.get('/');
      console.log('Fetched memories successfully');
      return response.data;
    } catch (error) {
      return handleError(error, 'fetching memories');
    }
  },

  createMemory: async (memory: Omit<Memory, 'id'>, operationId: string): Promise<Memory> => {
    try {
      console.log('Creating new memory:', memory);
      const response = await axiosInstance.post('/', { memory, operationId });
      console.log('Memory created successfully:', response.data);
      return response.data;
    } catch (error) {
      return handleError(error, 'creating memory');
    }
  },

  updateMemory: async (updatedMemory: Memory, operationId: string): Promise<Memory | null> => {
    try {
      console.log('Updating memory:', updatedMemory);
      const response = await axiosInstance.put(`/${updatedMemory.id}`, { updatedMemory, operationId });
      console.log('Memory updated successfully:', response.data);
      return response.data;
    } catch (error) {
      return handleError(error, 'updating memory');
    }
  },

  deleteMemory: async (id: string, operationId: string) => {
    try {
      console.log('Deleting memory:', id);
      await axiosInstance.delete(`/${id}`, { data: { operationId } });
      console.log('Memory deleted successfully');
    } catch (error) {
      return handleError(error, 'deleting memory');
    }
  },
};

export default MemoryRepository;






// import { Memory } from '../models/Memory';
// import { getDatabase } from '../utils/DatabaseUitls';
// import 'react-native-get-random-values';
// import { v4 as uuid } from 'uuid';

// const MemoryRepository = {
//     getAllMemories: async (): Promise<Memory[]> => {
//         const db = await getDatabase();
//         const results = await db.getAllAsync('SELECT * FROM memories');
//         return results as Memory[];
//     },
//     createMemory: async (memory: Omit<Memory, 'id'>): Promise<Memory> => {
//         const db = await getDatabase();
//         const id = uuid();
//         await db.runAsync(
//           'INSERT INTO memories (id, title, description, date, location, mood, tags) VALUES (?, ?, ?, ?, ?, ?, ?)',
//           [id, memory.title, memory.description, memory.date, memory.location, memory.mood, memory.tags]
//         );
//         return { id, ...memory };
//     },
//     updateMemory: async (updatedMemory: Memory): Promise<Memory | null> => {
//         const db = await getDatabase();
//         const { id, title, description, date, location, mood, tags } = updatedMemory;
//         await db.runAsync(
//           'UPDATE memories SET title = ?, description = ?, date = ?, location = ?, mood = ?, tags = ? WHERE id = ?',
//           [title, description, date, location, mood, tags, id]
//         );
//         return updatedMemory;
//     },
    
//     deleteMemory: async (id: string) => {
//         const db = await getDatabase();
//         await db.runAsync('DELETE FROM memories WHERE id = ?', [id]);
//     },

//     getMemory: async (id: string): Promise<Memory | null> => {
//         const db = await getDatabase();
//         const result = await db.getFirstAsync('SELECT * FROM memories WHERE id = ?', [id]);
//         return result as Memory;
//     },

//     syncMemories: async (memories: Memory[]): Promise<void> => {
//         const db = await getDatabase();
//         await Promise.all(memories.map(async (memory) => {
//             const existingMemory = await db.getFirstAsync('SELECT * FROM memories WHERE id = ?', [memory.id]);
//             if (existingMemory) {
//                 await db.runAsync(
//                     'UPDATE memories SET title = ?, description = ?, date = ?, location = ?, mood = ?, tags = ? WHERE id = ?',
//                     [memory.title, memory.description, memory.date, memory.location, memory.mood, memory.tags, memory.id]
//                 );
//             } else {
//                 await db.runAsync(
//                     'INSERT INTO memories (id, title, description, date, location, mood, tags) VALUES (?, ?, ?, ?, ?, ?, ?)',
//                     [memory.id, memory.title, memory.description, memory.date, memory.location, memory.mood, memory.tags]
//                 );
//             }
//         }));
//     }
// }

// export default MemoryRepository;