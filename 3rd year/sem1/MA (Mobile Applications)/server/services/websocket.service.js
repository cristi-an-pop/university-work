const WebSocket = require('ws');

class WebSocketService {
    constructor(server) {
        this.wss = new WebSocket.Server({ server });
        this.init();
    }

    init() {
        this.wss.on('connection', (ws) => {
            console.log('Client connected');

            ws.on('message', (message) => {
                try {
                    const data = JSON.parse(message);
                    console.log('Received message:', data);
                    this.broadcast(data);
                } catch (error) {
                    console.error('Error parsing message:', error);
                }
            });

            ws.on('close', () => console.log('Client disconnected'));
            ws.on('error', (error) => console.error('WebSocket error:', error));
        });
    }

    notifyClients(operation, data, operationId) {
        const message = {
            type: operation,
            data: data,
            operationId: operationId,
            timestamp: Date.now()
        };
        this.broadcast(message);
    }

    broadcast(data) {
        this.wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(data));
            }
        });
    }
}

module.exports = WebSocketService;