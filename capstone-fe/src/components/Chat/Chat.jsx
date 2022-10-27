import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { Avatar, Box, IconButton, Stack, TextField, Typography } from '@mui/material';
import { v4 as uuid } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import { getMessagesForChat, sendMessage } from '../../lib/axios';
import { setOnlineUsers, userSelector } from '../../lib/redux/reducers/auth';

function Chat({ chats, selectedChat, setSelectedChat, user }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [messageObj, setMessageObj] = useState(null);

  const dispatch = useDispatch();
  const { onlineUsers } = useSelector(userSelector);

  const socket = useRef();
  const lastMessageRef = useRef();

  useEffect(() => {
    socket.current = io(process.env.REACT_APP_BE_URL);
    socket.current.emit('new-user-add', user._id);
    socket.current.on('get-users', (users) => {
      dispatch(setOnlineUsers(users));
    });
  }, [user]);

  useEffect(() => {
    if (selectedChat._id) { getMessagesForChat(selectedChat._id).then((data) => setMessages(data)).catch(); }
  }, [selectedChat._id]);

  useEffect(() => {
    if (messageObj !== null) {
      socket.current.emit('send-message', messageObj);
      setMessages([...messages, { _id: uuid(), text: messageObj.message }]);
    }
  }, [messageObj]);

  useEffect(() => {
    socket.current.on('receive-message', (data) => {
      console.log(data);
      setMessages((prevMessages) => [...prevMessages, { _id: uuid(), text: data.message, receiverId: data.receiverId }]);
    });
  }, []);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newMessage !== '') {
      sendMessage(selectedChat._id, user._id, newMessage);
      const receiverId = selectedChat.members.find((id) => id !== user._id);
      setMessageObj({ message: newMessage, receiverId });

      setNewMessage('');
      // [...prevMessages, { text: data.text, _id: uuid() }]
    }
  };

  return (
    <div className="chat_window">
      <Box display="flex" className="chat_avatars_and_conversations" sx={{ overflowY: 'scroll' }}>
        <Stack display="flex" flexDirection="column">
          {chats?.map((chat) => (

            <IconButton key={chat._id} onClick={() => setSelectedChat(chat)}>
              <Avatar
                style={{ width: 30, height: 30 }}
                alt="Profile"
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              />
            </IconButton>

          ))}
        </Stack>

        <Stack display="flex" flexDirection="column">
          {messages?.map((message, i) => (
            <div ref={i === messages.length - 1 ? lastMessageRef : null} key={message._id + i}><Typography variant="body2">{message.text}</Typography></div>
          ))}
        </Stack>

      </Box>
      <Stack>
        <Box component="form" sx={{ display: 'flex', justifyContent: 'flex-end' }} onSubmit={handleSubmit}> <TextField value={newMessage} variant="filled" onChange={(e) => setNewMessage(e.target.value)} /></Box>
      </Stack>
    </div>
  );
}

export default Chat;
