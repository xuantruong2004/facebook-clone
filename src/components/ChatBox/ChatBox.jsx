import moment from "moment/moment";
import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import "./ChatBox.scss";

const ChatBox = ({ messageList }) => {
  const { user } = useSelector((state) => state.auth.authData);
  const scroll = useRef();
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageList]);
  return (
    <div className="chatBody">
      {messageList &&
        messageList.map((message) => (
          <div
            ref={scroll}
            key={message._id}
            className={
              message.senderId === user._id ? "messageItem own" : "messageItem"
            }
          >
            <span>{message?.text}</span>

            <span>
              {moment(message?.createdAt).startOf("second").fromNow()}
            </span>
          </div>
        ))}
    </div>
  );
};

export default ChatBox;
