import React, { useEffect, useRef } from "react";
import { BsThreeDots, BsFillCameraReelsFill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";

import ImageProfile from "../../img/defaultProfile.jpg";
import { useDebounce } from "../../hooks";
import "./MessageLeft.scss";
import { useState } from "react";
import { getSearchUser } from "../../api/UserRequest";
import { useSelector } from "react-redux";
import { createChat, getChats } from "../../api/ChatRequest";
import ChatItem from "./ChatItem";

const MessageLeft = ({ onlineUsers }) => {
  const [searchValue, setSearchValue] = useState("");
  const [userSearch, setUserSearch] = useState([]);
  const [userIdChat, setUserIdChat] = useState("");
  const [chatList, setChatList] = useState([]);

  const { user } = useSelector((state) => state.auth.authData);

  const debounce = useDebounce(searchValue, 300);

  useEffect(() => {
    const fetchSearchUser = async () => {
      const { data } = await getSearchUser(debounce.trim().toLowerCase());
      setUserSearch(data);
    };
    if (!searchValue) {
      setUserSearch([]);
    } else {
      fetchSearchUser();
    }
  }, [debounce]);

  useEffect(() => {
    const fetchChatList = async () => {
      const { data } = await getChats(user._id);
      setChatList(data);
    };
    fetchChatList();
  }, []);

  const addChat = async () => {
    if (userIdChat && searchValue !== "") {
      const chat = {
        senderId: user?._id,
        receiverId: userIdChat,
      };
      setSearchValue("");
      const { data } = await createChat(chat);
      setChatList((prev) => [data, ...prev]);
    }
  };

  const addUser = (user) => {
    setSearchValue(`${user?.firstname} ${user?.lastname}`);
    setUserIdChat(user._id);
    setUserSearch([]);
  };

  const checkOnlineStatus = (chat) => {
    const chatMembers = chat.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === chatMembers);
    return online ? true : false;
  };

  return (
    <div className="messageLeft">
      <div className="headerChat">
        <h2>Chat</h2>
        <div className="box-Icon">
          <div className="Item">
            <BsThreeDots />
          </div>
          <div className="Item">
            <BsFillCameraReelsFill />
          </div>
          <div className="Item">
            <FaEdit />
          </div>
        </div>
      </div>

      <div className="SearchChat">
        <div className="inputSearch">
          <BiSearch />
          <input
            type="text"
            placeholder="Search user Chat"
            className="input"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <button onClick={addChat}>Chat</button>
        {userSearch.length > 0 && (
          <div className="modalSearch">
            {userSearch.map((user) => (
              <div
                className="userItem"
                key={user._id}
                onClick={() => addUser(user)}
              >
                <img
                  src={user?.profileImage || ImageProfile}
                  alt=""
                  className="image"
                />
                <span>
                  {user?.firstname} {user?.lastname}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="ChatList">
        {chatList &&
          chatList.map((chat) => (
            <ChatItem
              key={chat._id}
              data={chat}
              online={checkOnlineStatus(chat)}
            />
          ))}
      </div>
    </div>
  );
};

export default MessageLeft;
