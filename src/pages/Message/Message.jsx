import React from "react";
import MessageLeft from "../../components/MessageLeft/MessageLeft";
import MessageRight from "../../components/MessageRight/MessageRight";
import Navbar from "../../components/Navbar/Navbar";
import "./Message.scss";

const Message = () => {
  return (
    <div className="message">
      <Navbar />
      <div className="message-container">
        {/* left */}
        <div className="message-left">
          <MessageLeft />
        </div>
        {/* right */}
        <div className="message-right">
          <MessageRight />
        </div>
      </div>
    </div>
  );
};

export default Message;
