import React from "react";
import { BsFillTelephoneFill, BsCameraVideoFill } from "react-icons/bs";
import { RiErrorWarningFill } from "react-icons/ri";
import { IoMdAddCircle, IoIosSend } from "react-icons/io";
import InputEmoji from "react-input-emoji";

import "./MessageRight.scss";
import ImageProfile from "../../img/defaultProfile.jpg";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getUser } from "../../api/UserRequest";
import { useParams } from "react-router-dom";
import ChatBox from "../ChatBox/ChatBox";
import { getChat2Id } from "../../api/ChatRequest";
import { addMessage, getMessages } from "../../api/MessageRequest";
import { io } from "socket.io-client";
import { useRef } from "react";

const MessageRight = ({ onlineUsers, receiverMessage, setSendMessage }) => {
  const { user } = useSelector((state) => state.auth.authData);
  const [userChat, setUserChat] = useState({});
  const [messageList, setMessageList] = useState([]);
  const [idChat, setIdChat] = useState();

  const params = useParams();
  const userChatId = params.id;

  useEffect(() => {
    const fetchUserId = async () => {
      const { data } = await getUser(userChatId);
      setUserChat(data);
    };
    const fetchChatId = async () => {
      const { data } = await getChat2Id(userChatId, user._id);
      const id = data?._id;
      setIdChat(data);
      if (data) {
        const { data } = await getMessages(id);
        setMessageList(data);
      }
    };
    fetchUserId();
    fetchChatId();
  }, [userChatId]);

  const [newMessage, setNewMessage] = useState("");
  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    const message = {
      chatId: idChat._id,
      senderId: user._id,
      text: newMessage,
    };
    const { data } = await addMessage(message);
    setMessageList((prev) => [...prev, data]);
    setNewMessage("");

    // send  message to socket server
    const receiverId = idChat.members.find((id) => id !== user._id);
    setSendMessage({ ...message, receiverId, _id: new Date().getTime() });
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleSend(e);
    }
  };

  useEffect(() => {
    if (receiverMessage !== null && receiverMessage.chatId === idChat._id) {
      console.log("da nhan duoc", [...messageList, receiverMessage]);
      setMessageList([...messageList, receiverMessage]);
    }
  }, [receiverMessage]);

  const checkOnlineStatus = (chat) => {
    if (chat) {
      const chatMembers = chat.members.find((member) => member !== user._id);
      const online = onlineUsers.find((user) => user.userId === chatMembers);
      return online ? true : false;
    } else {
      return false;
    }
  };

  return (
    <div className="messageRight">
      <div className="headerBox">
        <div className="infoUser">
          <img
            src={userChat?.profileImage || ImageProfile}
            alt="imageProfile"
          />
          {checkOnlineStatus(idChat) && <div className="online-dot"></div>}
          <div>
            <span className="name">
              {userChat?.firstname} {userChat?.lastname}
            </span>
            <span className="online">
              {checkOnlineStatus(idChat) ? "online" : "ofline"}
            </span>
          </div>
        </div>
        <div className="BoxIcon">
          <div className="icon">
            <BsFillTelephoneFill />
          </div>
          <div className="icon">
            <BsCameraVideoFill />
          </div>
          <div className="icon">
            <RiErrorWarningFill />
          </div>
        </div>
      </div>

      <div className="container-message">
        <ChatBox messageList={messageList} />
      </div>
      <form className="add-newMessage">
        <IoMdAddCircle className="iconAdd" />
        <div className="inputMessage">
          <InputEmoji
            value={newMessage}
            placeholder="Aa"
            onChange={handleChange}
            onKeyDown={(e) => handleEnter(e)}
          />
        </div>
        <button onClick={handleSend}>
          <IoIosSend className="iconSend" />
        </button>
      </form>
    </div>
  );
};

export default MessageRight;
