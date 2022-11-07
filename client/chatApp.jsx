import React, { useState } from "react";

export function ChatApp({ messages, onNewMessage, onClose }) {
    const [message, setMessage] = useState("");

    function handleSubmit(e){
        e.preventDefault();
        onNewMessage(message);
        setMessage('');
    }

    return(
        <>
            <header> Pg6301 - websocket chat </header>
            <main>
                {messages.map(({ message, user }, index) => (
                  <div key={index}>
                      <strong>{user}: </strong> {message}
                  </div>
                ))}
            </main>
            <footer>
                <form onSubmit={handleSubmit}>
                    <input
                        autoFocus={true}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button> Send </button>
                </form>
            </footer>
            <button onClick={onClose}> Close </button>
        </>
    );
}