import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { ChatApp } from "./chatApp"

const initialMessages = [];

function UserRegistrationForm( { onUsername }) {
    const [ username, setUsername ] = useState("");

    function handleSubmit(event){
        event.preventDefault();
        onUsername(username);
    }

    return(
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>
            <button> Submit </button>
        </form>
    );
}

function Application(){
    const [user, setUser] = useState();
    const [messages, setMessages] = useState(initialMessages);
    const [ws, setWs] = useState();

    useEffect(() => {
       const ws = new WebSocket("ws://" + window.location.host);
       ws.onopen = (event) => {
         console.log("Opened", event);
       };
       ws.onmessage = (event) => {
         console.log("Message: ", event);
         const { user, message } = JSON.parse(event.data);
         setMessages((messages) => [...messages, { message, user }]);
       };
        setWs(ws);
    }, []);

    function handleNewMessage(message){
        ws.send(JSON.stringify({ message, user }));
    }

    function handleClose(){
        console.log("LMAO")
        ws.close();
    }
    //console.log(user);
    if(!user){
        return <UserRegistrationForm onUsername={setUser} />;
    }
    return(
      <ChatApp messages={messages} onNewMessage={handleNewMessage} onClose={handleClose} />
    );
}

const root = createRoot(document.getElementById("app"));
root.render(<Application />);