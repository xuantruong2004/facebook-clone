import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import MessageLeft from "../../components/MessageLeft/MessageLeft";
import MessageRight from "../../components/MessageRight/MessageRight";
import Navbar from "../../components/Navbar/Navbar";
import "./Message.scss";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Message = () => {
  const { user } = useSelector((state) => state.auth.authData);
  const params = useParams();
  const userChatId = params.id;

  const socket = useRef();
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receiverMessage, setReceiverMessage] = useState(null);
  useEffect(() => {
    socket.current = io("https://truongxuan-socketfb.herokuapp.com");
    socket.current.emit("new-add-user", user._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  // send message socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  useEffect(() => {
    socket.current.on("receive-message", (data) => {
      setReceiverMessage({ ...data });
      console.log("receiver ", receiverMessage);
    });
  }, [socket.current]);

  return (
    <div className="message">
      <Navbar />
      <div className="message-container">
        {/* left */}
        <div className="message-left">
          <MessageLeft onlineUsers={onlineUsers} />
        </div>
        {/* right */}
        <div className="message-right">
          {userChatId === user._id ? (
            <div className="room-chat">Choose chat room</div>
          ) : (
            <MessageRight
              onlineUsers={onlineUsers}
              setSendMessage={setSendMessage}
              receiverMessage={receiverMessage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
