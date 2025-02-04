import Repository from "../repository/Repository";
import { ToastAndroid, Platform, Alert } from 'react-native';

type QueuedOperation = {
  type: 'CREATE' | 'UPDATE' | 'DELETE';
  data: any;
  timestamp: number;
};

class WebSocketService {
  private static instance: WebSocketService;
  private ws: WebSocket | null = null;
  private isConnected: boolean = false;
  private queue: QueuedOperation[] = [];
  private messageHandler: ((message: any) => void) | null = null;
  private processedOperations: Set<string> = new Set(); // Track processed operations
  private connectionHandler: (() => void) | null = null; // Handler for connection status
  private offlineHandler: (() => void) | null = null; // Handler for offline status

  private constructor() {
    this.connect();
  }

  static getInstance() {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }

  setMessageHandler(handler: (message: any) => void) {
    this.messageHandler = handler;
  }

  setConnectionHandler(handler: () => void) {
    this.connectionHandler = handler;
  }

  setOfflineHandler(handler: () => void) {
    this.offlineHandler = handler;
  }

  connect() {
    this.ws = new WebSocket('ws://192.168.31.34:5000');
    
    this.ws.onopen = () => {
      console.log('WebSocket Connected');
      this.isConnected = true;
      if (this.connectionHandler) {
        this.connectionHandler();
      }
      this.processQueue();
    };

    this.ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log('WebSocket Message:', message);
      if (this.messageHandler && !this.processedOperations.has(message.operationId)) {
        this.messageHandler(message);
        this.processedOperations.add(message.operationId); // Mark the operation as processed
      }
      if (Platform.OS === 'android') {
        ToastAndroid.show(`New item added: ${message.data.title}`, ToastAndroid.LONG);
      } else {
        Alert.alert('New item added', message.data.title);
      }
    }

    this.ws.onclose = () => {
      console.log('WebSocket Disconnected');
      this.isConnected = false;
      if (this.offlineHandler) {
        this.offlineHandler();
      }
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket Error:', error);
      this.isConnected = false;
      if (this.offlineHandler) {
        this.offlineHandler();
      }
    };
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
              await Repository.createItem(operation.data);
              break;
            case 'UPDATE':
              await Repository.updateItem(operation.data);
              break;
            case 'DELETE':
              await Repository.deleteItem(operation.data);
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