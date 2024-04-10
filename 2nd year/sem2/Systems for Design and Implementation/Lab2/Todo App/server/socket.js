import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: +(process.env.SOCKET_PORT ?? 5000) });

wss.on("connection", (ws) => {
    console.log("Connecting");
    
    ws.on("error", console.error);

    ws.on("message", (message) => { 
        console.log(`Received: ${message}`);
    });

    ws.send(
        JSON.stringify({
            id: "34234235",
            name: "Andalouse",
            tasks: []
        })
    )
})