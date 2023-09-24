import { ChatMessage } from "../types/chatMessage";

interface MessageProps {
    myUsername: string;
    chatMessage: ChatMessage;
}

function Message({ myUsername, chatMessage }: MessageProps) {
    return (
        <div className="message">
            <div
                className={chatMessage.username === myUsername ? "my" : "other"}
            >
                <strong>{chatMessage.username}</strong>:{" "}
                <span>{chatMessage.message}</span>
            </div>
        </div>
    );
}

export default Message;
