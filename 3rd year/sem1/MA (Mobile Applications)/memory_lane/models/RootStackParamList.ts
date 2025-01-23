import { Memory } from './Memory';

export type RootStackParamList = {
    MemoryList: undefined;
    CreateMemory: undefined;
    UpdateMemory: {
      memory: Memory;
      onDelete: () => void;
      onPress: () => void;
    };
    MemoryDetails: {
      memory: Memory;
    };
}