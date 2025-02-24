import Toast from 'react-native-toast-message';

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
    this.ws = new WebSocket(`ws://172.30.251.145:2505`);
    
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
    }

    this.ws.onclose = () => {
      console.log('WebSocket Disconnected');
      this.isConnected = false;
      if (this.offlineHandler) {
        this.offlineHandler();
      }
    };

    this.ws.onerror = (error) => {
      console.log('WebSocket Error:', error);
      this.isConnected = false;
      Toast.show({
        type: 'error',
        text1: 'WebSocket Error',
        text2: 'An error occurred while connecting to the server',
      });
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