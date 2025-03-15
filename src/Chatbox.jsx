import Chatbubble from './Chatbubble.jsx'
import React, { useEffect, useState } from 'react';

function Chatbox() {
    const [chatMessagesDataState, setChatMessagesDataState] = useState([]);

    const setLastMessage = async (number) => {
        try {
            const res = await fetch("http://localhost:5000/api/setlastmessage/" + (isNaN(Number(number)) ? 0 : number));

            if (!res.ok) {
                throw new Error('Failed to update');
            }
            const data = await res.json();
        } catch (err) {
            //create log file latter
        }
    };

    const url = "http://localhost:5000/api/message/0";
    const fetchData = async () => {
        try {
            const response = await fetch(url);
            const json = await response.json();

            if (json.status != 'success')
                return;

            json.message.forEach(msg => {
                setChatMessagesDataState(prevState => {
                    if (!prevState.some(stateMsg => stateMsg.messageId === msg.messageId)) {
                        return [...prevState, msg];
                    }
                    return prevState;
                });
            });
            setLastMessage(json.message[json.message.length - 1].messageId);
        } catch (error) {
            console.log("error", error);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            fetchData();
        }, 1000);
        window.scrollTo(0, document.body.scrollHeight)
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        chatMessagesDataState.forEach((message, index) => {
            setTimeout(() => {
                setChatMessagesDataState(prevState => prevState.filter((_, i) => i !== index));
            }, 3000);
        });
        window.scrollTo(0, document.body.scrollHeight)
    }, [chatMessagesDataState]);

    setInterval(() => {   }, 100);

    return (
        <div className="main-container chat-messages hiding">
            {
                chatMessagesDataState.map((message, key) => {
                    return <Chatbubble key={key} {...message} />;
                })
            }

        </div>
        );
    };         
export default Chatbox;
