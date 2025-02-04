import Repository from "../repository/Repository";
import { ToastAndroid, Platform, Alert } from 'react-native';

class WebSocketService {
  private static instance: WebSocketService;
  private ws: WebSocket | null = null;
  private isConnected: boolean = false;
  private messageHandler: ((message: any) => void) | null = null;
  private connectionHandler: (() => void) | null = null;
  private offlineHandler: (() => void) | null = null;

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
    };

    this.ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log('WebSocket Message:', message);
      if (this.messageHandler) {
        this.messageHandler(message);
      }
      if (Platform.OS === 'android') {
        ToastAndroid.show(`New item added: ${message.data.title}`, ToastAndroid.LONG);
      } else {
        switch (message.type) {
          case 'CREATE':
            Alert.alert('New Item Added', `Title: ${message.data.title}, Description: ${message.data.description}, Date: ${message.data.date}`);
            break;
          case 'UPDATE':
            Alert.alert('Item Updated', `Item updated: ${message.data.title}`);
            break;
          case 'DELETE':
            Alert.alert('Item Deleted', `Item deleted: ${message.data}`);
            break;
        }
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
}

export default WebSocketService;