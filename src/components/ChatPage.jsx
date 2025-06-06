import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import './ChatPage.css';

//changed hardcoded localhost conn. to use backend or localhost appropiately.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
const socket = io(API_URL);

const ChatPage = ({ userId, dentistId, userType, onClose }) => {
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);

    useEffect(() => {
        if (!socket) return;

        socket.emit('joinRoom', { userId, dentistId });

        socket.on('chatHistory', (messages) => {
            setChat(messages);
        })

        socket.on('receive_message', (data) => {
            if (
                (data.userId === userId && data.dentistId === dentistId) ||
                (data.userId === dentistId && data.dentistId === userId)
            ) {
                setChat((prev) => [...prev, data]);
            }
        });

        return () => {
            socket.off('chatHistory');
            socket.off('receive_message');
        }
    }, [userId, dentistId]);

    const sendMessage = () => {
        if (message.trim() === '') return;

        socket.emit('send_message', {
            userId,
            dentistId,
            text: message,
            sentBy: userType
        });
        setMessage('');
    };

    return (
        <div className="overlay">
            <div className="popup">
                <div className="header">
                    <h3> {`Chat with ${userType === 'user' ? 'Dentist' : 'User'}`} </h3>
                    <button onClick={onClose} className="close-btn"> X </button>
                </div>
                <div className="chat-area">
                    {chat.map((msg, idx) => (
                        <div
                            key={idx}
                            className={`message ${msg.sentBy === userType ? 'sent' : 'received'}`}
                        >
                            <p> {msg.text} </p>
                            <small> {new Date(msg.timestamp).toLocaleTimeString()} </small>
                        </div>
                    ))}
                </div>
                <div className="input-area">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your message"
                        className="input"
                    />
                    <button onClick={sendMessage} className="send-btn"> Send </button>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;