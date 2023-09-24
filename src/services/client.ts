import { ChatMessage } from "../types/chatMessage";

const WS_URL = import.meta.env.VITE_API_ENDPOINT;

export class Client {
    private socket: WebSocket;

    constructor(receiveMessageCallback: (chatMessage: ChatMessage) => void) {
        this.socket = new WebSocket(WS_URL);

        this.socket.onopen = () => {
            console.log("Connected to the WebSocket");
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

        this.socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            receiveMessageCallback(data);
        };
    }

    initilize() {}

    sendMessage(message: ChatMessage) {
        const data = {
            action: "sendmessage",
            message: message.message,
            username: message.username,
        };

        this.socket.send(JSON.stringify(data));
    }
}
