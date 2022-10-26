import { useEffect, useState } from 'react';
import { Avatar, Box, IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { v4 as uuid } from 'uuid';
import { getMessagesForChat, sendMessage } from '../../lib/axios';

function Chat({ chats, selectedChat, setSelectedChat, user }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newMessage !== '') {
      sendMessage(selectedChat, user._id, newMessage).then((data) => setMessages((prevMessages) => [...prevMessages, { text: data.text, _id: uuid() }]));
    }
  };
  useEffect(() => {
    getMessagesForChat(selectedChat).then((data) => setMessages(data)).catch();
  }, [selectedChat]);

  return (
    <div className="chat_window">
      <Box display="flex" className="chat_avatars_and_conversations">
        <Stack display="flex" flexDirection="column">
          {chats?.map((chat) => (

            <IconButton key={chat._id} onClick={() => setSelectedChat(chat._id)}>
              <Avatar
                style={{ width: 30, height: 30 }}
                alt="Profile"
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              />
            </IconButton>

          ))}
        </Stack>
        <Stack display="flex" flexDirection="column" justifyContent="space-between">
          <Stack display="flex" flexDirection="column">
            {messages?.map((message, i) => (
              <Typography key={message._id + i} variant="body2">{message.text}</Typography>
            ))}
          </Stack>
          <Stack>
            <Box component="form" onSubmit={handleSubmit}> <TextField variant="filled" onChange={(e) => setNewMessage(e.target.value)} /></Box>
          </Stack>
        </Stack>
        <div />
      </Box>
    </div>
  );
}

export default Chat;
