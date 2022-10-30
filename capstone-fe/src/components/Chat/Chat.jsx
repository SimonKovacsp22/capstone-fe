/* eslint-disable max-len */
import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { Box, Button, IconButton, Stack, TextField, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { v4 as uuid } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import { getMessagesForChat, sendMessage } from '../../lib/axios';
import { setOnlineUsers, userSelector } from '../../lib/redux/reducers/auth';

function ChatIcon() {
  return (
    <svg style={{ marginBlockEnd: '2px' }} xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" className="bi bi-chat" viewBox="0 0 16 16">
      <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z" />
    </svg>
  );
}

function Chat({ selectedChat, user, show, setShow }) {
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
    <div className="chat_window" style={{ display: `${show ? 'flex' : 'none'}` }}>
      <Box display="flex" className="chat_avatars_and_conversations" sx={{ flexDirection: 'column' }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{ backgroundColor: 'rgba(46,58,79,1)',
            padding: '1rem',
            color: 'white',
            borderTopLeftRadius: '5px',
            borderTopRightRadius: '5px' }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center"><ChatIcon /><Typography color="white" ml="1rem"> Live Support Chat</Typography> </Box>
          <div
            className="chat_cancel_btn"
            onClick={() => {
              setShow(false);
            }}
          >&#10006;
          </div>
        </Box>
        <div style={{ borderBottom: '1px solid #e8e8e8', marginBlockEnd: '.5rem' }}>
          <Typography fontSize=".8rem" fontWeight="400" color="grey" sx={{ margin: '.5rem 1rem ' }}>
            You are chatting with <span style={{ fontWeight: '600', color: 'rgba(46,58,79,1)' }}>Support Team</span>
          </Typography>
        </div>

        <Stack display="flex" flexDirection="column" sx={{ overflowY: 'scroll', height: '250px', maxHeight: '250px', paddingInline: '1rem', paddingBlockStart: '.5rem' }}>
          {messages?.map((message, i) => (
            <div ref={i === messages.length - 1 ? lastMessageRef : null} key={message._id + i}><Typography variant="body2">{message.text}</Typography></div>
          ))}
        </Stack>

      </Box>

      <Box component="form" sx={{ display: 'flex', justifyContent: 'flex-end', padding: '.5rem', paddingInlineEnd: '1.5rem', border: '1px solid #e8e8e8' }} onSubmit={handleSubmit}> <input className="chat_input" type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
        <Button type="submit" startIcon={<SendIcon />}>
          Send
        </Button>
      </Box>

    </div>
  );
}

export default Chat;
