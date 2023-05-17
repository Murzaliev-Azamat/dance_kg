import React, { useEffect, useRef, useState } from 'react';
import { IncomingMessage, Message, User } from '../../../types';
import { Container } from '@mui/material';
import { useAppSelector } from '../../app/hooks';
import { selectUser } from '../users/usersSlise';

const Chat = () => {
  const user = useAppSelector(selectUser);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageText, setMessageText] = useState('');
  const [users, setUsers] = useState<User[]>([]);

  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:8000/chat');
    ws.current.onclose = () => {
      console.log('ws closed');
    };
    ws.current.onmessage = (event) => {
      const decodedMessage = JSON.parse(event.data) as IncomingMessage;

      if (decodedMessage.type === 'MESSAGES') {
        console.log(decodedMessage.payload);
        const newMessages = decodedMessage.payload as Message[];
        setMessages(newMessages);
      }

      if (decodedMessage.type === 'ONLINE_USERS') {
        console.log(decodedMessage.payload);
        const newUsers = decodedMessage.payload as User[];
        setUsers(newUsers);
      }

      if (decodedMessage.type === 'NEW_MESSAGE') {
        console.log(decodedMessage.payload);
        const newMessage = decodedMessage.payload as Message;
        setMessages((prev) => [...prev, newMessage]);
      }

      if (decodedMessage.type === 'NEW_USER') {
        console.log(decodedMessage.payload);
        const newUser = decodedMessage.payload as User;
        setUsers((prev) => [...prev, newUser]);
      }

      if (decodedMessage.type === 'LOGOUT') {
        console.log(decodedMessage.payload);
        const LogoutUser = decodedMessage.payload as User;
        setUsers((prev) => prev.filter((user) => user?._id !== LogoutUser?._id));
      }
    };

    ws.current.onopen = () => {
      if (!ws.current) return;
      ws.current.send(
        JSON.stringify({
          type: 'LOGIN',
          payload: user?.token,
        }),
      );
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [user?.token]);

  const changeMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageText(e.target.value);
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (!ws.current) return;

    ws.current.send(
      JSON.stringify({
        type: 'SEND_MESSAGE',
        payload: messageText,
      }),
    );
  };

  return (
    <Container maxWidth="md" sx={{ mt: 2 }}>
      <div style={{ marginBottom: '5px', backgroundColor: '#1976d2', padding: '5px', color: 'white' }}>
        <p>Online users:</p>
        {user ? (
          users.map((user) => (
            <p key={user._id} style={{ margin: '0' }}>
              {user.displayName}
            </p>
          ))
        ) : (
          <div></div>
        )}
      </div>
      {messages.map((message) => (
        <div key={message._id} style={{ paddingLeft: '5px', marginBottom: '5px' }}>
          <b style={{ color: '#1976d2' }}>{message.user.displayName}</b>
          <span> said: </span>
          <i>{message.text}</i>
        </div>
      ))}

      <form onSubmit={sendMessage}>
        <input type="text" name="messageText" value={messageText} onChange={changeMessage} />
        <input type="submit" value="Send" />
      </form>
    </Container>
  );
};

export default Chat;
