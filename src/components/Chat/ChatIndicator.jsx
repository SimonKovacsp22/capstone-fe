import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from '../../lib/redux/reducers/auth';
import Chat from './Chat';
import { getChatsForUser } from '../../lib/axios';
import './styles-chat.css';

function ChatIndicator() {
  const { user } = useSelector(userSelector);
  const [selectedChat, setSelectedChat] = useState({});
  const [chats, setChats] = useState([]);
  const [show, setShow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (user._id) {
      getChatsForUser(user._id).then((data) => { setChats(data); setSelectedChat(data[0]); });
    }
  }, [user._id]);
  return (
    <>
      <div
        className="chat_indicator"
        onClick={() => {
          setShow(true); setShowAlert((prewState) => {
            if (prewState === true) return false;
          });
        }}
        style={{ boxShadow: `${showAlert ? 'rgb(255 0 0 / 75%) 0px 0px 8px 7px' : ' 0px 0px 11px 4px rgb(118, 143, 186, 0.9)'}` }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          style={{ marginBlockStart: '3px' }}
          width="30"
          height="30"
          fill="currentColor"
          className="bi bi-chat-right"
          viewBox="0 0 16 16"
        >
          <path d="M2 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h9.586a2 2 0 0 1 1.414.586l2 2V2a1 1 0 0 0-1-1H2zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12z" />
        </svg>

      </div>
      <Chat chats={chats} selectedChat={selectedChat} setSelectedChat={setSelectedChat} show={show} setShow={setShow} setShowAlert={setShowAlert} />
    </>
  );
}

export default ChatIndicator;
