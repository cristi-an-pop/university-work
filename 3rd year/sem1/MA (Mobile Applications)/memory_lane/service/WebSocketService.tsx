import { Memory } from '../models/Memory';
import MemoryRepository from '../repository/MemoryRepository';
import { useMemoryStore } from '../stores/MemoryStore';

type QueuedOperation = {
  type: 'CREATE' | 'UPDATE' | 'DELETE';
  data: any;
  timestamp: number;
};

class WebSocketService {
  private static instance: WebSocketService;
  private ws: WebSocket | null = null;
  private isConnected: boolean = false;
  private reconnectTimer: NodeJS.Timeout | null = null;
  private queue: QueuedOperation[] = [];

  private constructor() {
    this.connect();
  }

  static getInstance() {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }

  private connect() {
    this.ws = new WebSocket('ws://192.168.37.184:5000');
    
    this.ws.onopen = () => {
      console.log('WebSocket Connected');
      this.isConnected = true;
      this.processQueue();
    };

    this.ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log('WebSocket Message:', message);
      useMemoryStore.getState().handleWebSocketMessage(message);
    }

    this.ws.onclose = () => {
      console.log('WebSocket Disconnected');
      this.isConnected = false;
      this.reconnect();
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket Error:', error);
      this.isConnected = false;
    };
  }
  

  private reconnect() {
    if (!this.reconnectTimer) {
      this.reconnectTimer = setInterval(() => {
        if (!this.isConnected) {
          this.connect();
        } else {
          if (this.reconnectTimer) {
            clearInterval(this.reconnectTimer);
            this.reconnectTimer = null;
          }
        }
      }, 5000);
    }
  }

  isServerConnected() {
    return this.isConnected;
  }

  addToQueue(operation: QueuedOperation) {
    this.queue.push(operation);
    if (this.isConnected) {
      this.processQueue();
    }
  }

  private async processQueue() {
    while (this.isConnected && this.queue.length > 0) {
      const operation = this.queue.shift();
      if (operation) {
        try {
          switch (operation.type) {
            case 'CREATE':
              await MemoryRepository.createMemory(operation.data, "");
              break;
            case 'UPDATE':
              await MemoryRepository.updateMemory(operation.data, "");
              break;
            case 'DELETE':
              await MemoryRepository.deleteMemory(operation.data, "");
              break;
          }
        } catch (error) {
          console.error('Error processing queued operation:', error);
          this.queue.unshift(operation);
          break;
        }
      }
    }
  }
}

export default WebSocketService;