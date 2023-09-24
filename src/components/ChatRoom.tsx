import { useState, useEffect } from "react";
import { ChatMessage } from "../types/chatMessage";
import Message from "./Message";
import { Client } from "../services/client";

interface ChatRoomProps {
    username: string;
}

function ChatRoom({ username }: ChatRoomProps) {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [client, setClient] = useState<Client>();

    function sendMessage() {
        const newMessage: ChatMessage = {
            username,
            message: inputValue,
        };

        if (!client) throw new Error("Client not initialized");
        client.sendMessage(newMessage);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setInputValue("");
    }

    function handleReceiveMessage(message: ChatMessage) {
        setMessages((prevMessages) => [...prevMessages, message]); // use message not newMessage
    }

    useEffect(() => {
        setClient(new Client(handleReceiveMessage));
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
