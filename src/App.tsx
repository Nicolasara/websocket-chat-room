import "./App.css";
import { useState, useEffect } from "react";
import ChatRoom from "./components/ChatRoom";

function App() {
    const [username, setUsername] = useState<string>("null");

    useEffect(() => {
        let possibleUsername: string | null = null;
        while (!possibleUsername) {
            possibleUsername = prompt("What is your username?");
        }
        setUsername(possibleUsername);
    }, []);

    return (
        <div className="App">
            <header className="App-header">Chat Room</header>
            <ChatRoom username={username} />
        </div>
    );
}

export default App;
