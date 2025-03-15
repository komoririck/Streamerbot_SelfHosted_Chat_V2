import React, { useEffect, useState } from 'react';
import './AdminPanel.css';

function AdminPanel() {
    const [chatMessagesDataState, setChatMessagesDataState] = useState([]);

    const url = "http://localhost:5000/api/message/1000";
    const fetchData = async () => {
        try {
            const response = await fetch(url);
            const json = await response.json();

            if (json.status != 'success')
                return;

            json.message.forEach(msg => {
                setChatMessagesDataState(prevState => {
                    if (!prevState.some(stateMsg => stateMsg.messageId === msg.messageId)) {
                        return [msg, ...prevState];
                    }
                    return prevState;
                });
            });
        } catch (error) {
            console.log("error", error);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            fetchData();
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="chatMessagesTable">
            <div className="tableHeader">
                <div>UserName</div>
                <div>Message</div>
                <div>Date</div>
                <div>Platform</div>
                <div>Amount</div>
                <div>Profile Picture</div>
                <div>Message ID</div>
                <div>Chatter Tag</div>
                <div>Rank Info</div>
                <div>Member Tier</div>
                <div>Donate Type</div>
                <div>Actions</div>
            </div>
            {chatMessagesDataState.map((message, key) => (
                <div className="tableRow" key={key}>
                    <div>{message.userName}</div>
                    <div>{message.userMessage}</div>
                    <div>{message.date}</div>
                    <div>{message.typeAndPlataform}</div>
                    <div>{message.donateAmount}</div>
                    <div>
                        <img src={message.profilePicture} alt="Profile" className="profileImage" />
                    </div>
                    <div>{message.messageId}</div>
                    <div>{message.typeChatterTag}</div>
                    <div>{message.rankInfo}</div>
                    <div>{message.memberTier}</div>
                    <div>{message.donateType}</div>
                    <div className="actionButtons">
                        <button>Edit</button>
                        <button>Delete</button>
                        <button>View</button>
                    </div>
                </div>
            ))}
        </div>

    );
};
            
export default AdminPanel;
