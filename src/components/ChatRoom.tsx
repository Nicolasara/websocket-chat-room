import { useState, useEffect } from "react";
import { ChatMessage } from "../types/chatMessage";
import Message from "./Message";

const WS_URL =
    "wss://yq8tto4zje.execute-api.us-east-2.amazonaws.com/production";

interface ChatRoomProps {
    username: string;
}

function ChatRoom({ username }: ChatRoomProps) {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [socket] = useState<WebSocket>(new WebSocket(WS_URL));

    function sendMessage() {
        const newMessage: ChatMessage = {
            username,
            message: inputValue,
        };

        const data = {
            action: "sendmessage",
            message: newMessage.message,
            username: newMessage.username,
        };

        socket.send(JSON.stringify(data));
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setInputValue("");
    }

    function handleReceiveMessage(message: ChatMessage) {
        setMessages((prevMessages) => [...prevMessages, message]); // use message not newMessage
    }

    useEffect(() => {
        socket.onopen = () => {
            console.log("Connected to the WebSocket");
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log(data);
            handleReceiveMessage(data);
        };

        socket.onclose = (event) => {
            if (event.wasClean) {
                console.log(
                    `Closed cleanly, code=${event.code}, reason=${event.reason}`
                );
            } else {
                console.error("Connection died");
            }
        };

        socket.onerror = (error) => {
            console.error(`[error] ${error}`);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <div className="chat-display">
                {messages.map((chatMessage, index) => (
                    <Message
                        key={index}
                        myUsername={username}
                        chatMessage={chatMessage}
                    />
                ))}
            </div>
            <div className="chat-input">
                <input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}

export default ChatRoom;
