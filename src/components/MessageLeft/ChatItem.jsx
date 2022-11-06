import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getUser } from "../../api/UserRequest";
import ImageProfile from "../../img/defaultProfile.jpg";

const ChatItem = ({ data }) => {
  const { user } = useSelector((state) => state.auth.authData);
  const [userChat, setUserChat] = useState({});
  const navigate = useNavigate();
  const params = useParams();
  const ChatId = params.id;
  const handleClickChatId = () => {
    navigate(`/message/${userChat._id}`);
  };
  useEffect(() => {
    const userChatId = data.members.filter((userId) => userId !== user._id)[0];
    const fetchUserChat = async () => {
      const { data } = await getUser(userChatId);
      setUserChat(data);
    };
    fetchUserChat();
  }, []);
  return (
    <div
      className={userChat._id === ChatId ? "chatItem active" : "chatItem"}
      onClick={() => handleClickChatId()}
    >
      <img src={userChat?.profileImage || ImageProfile} alt="ImageUser" />
      <span>
        {userChat?.firstname} {userChat?.lastname}
      </span>
    </div>
  );
};

export default ChatItem;
