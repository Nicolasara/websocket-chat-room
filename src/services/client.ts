import { ChatMessage } from "../types/chatMessage";

export class Client {
    private socket: WebSocket | undefined;

    constructor() {}

    checkSocket(): WebSocket {
        if (!this.socket) {
            throw new Error("Socket is not initialized");
        }
        return this.socket;
    }

    initilize(
        receiveMessageCallback: ({ username, message }: ChatMessage) => void
    ) {
        const wsURL =
            "wss://yq8tto4zje.execute-api.us-east-2.amazonaws.com/production";
        this.socket = new WebSocket(wsURL);

        this.socket.onopen = () => {
            console.log("Connected to the WebSocket");
        };

        this.socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            receiveMessageCallback(data);
        };

        this.socket.onclose = (event) => {
            if (event.wasClean) {
                console.log(
                    `Closed cleanly, code=${event.code}, reason=${event.reason}`
                );
            } else {
                console.error("Connection died");
            }
        };

        this.socket.onerror = (error) => {
            console.error(`[error] ${error}`);
        };
    }

    sendMessage(message: ChatMessage) {
        const socket = this.checkSocket();
        const data = {
            action: "sendmessage",
            message,
        };
        socket.send(JSON.stringify(data));
    }
}
