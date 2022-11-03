import React, { useState } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp"; //like
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined"; //notlike
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { RiShareForwardLine } from "react-icons/ri";
import moment from "moment/moment";

import "./PostItem.scss";
import PostPic1 from "../../../img/postpic1.jpg";
import { useSelector } from "react-redux";
import { likePost } from "../../../api/PostRequest";
import { useNavigate } from "react-router-dom";

const PostItem = ({ data, persons }) => {
  const { user } = useSelector((state) => state.auth.authData);
  const [liked, setLiked] = useState(data.like.includes(user._id));
  const [like, setLike] = useState(data.like.length);

  const userId = persons.find((person) => person._id === data.userId);

  const handleLike = () => {
    likePost(data._id, user._id);
    setLiked(!liked);
    liked ? setLike((prev) => prev - 1) : setLike((prev) => prev + 1);
  };

  const navigate = useNavigate();
  const GotoProfile = () => {
    navigate(`/profile/${userId._id}`);
  };

  return (
    <div className="PostItem">
      <div className="userPost">
        <img
          src={userId?.profileImage ? userId?.profileImage : PostPic1}
          alt="imageUser"
          onClick={GotoProfile}
        />
        <span onClick={GotoProfile}>
          {userId?.firstname} {userId?.lastname}
        </span>
      </div>
      <div className="detail">
        <span>{data?.desc}</span>
      </div>
      {data?.image && <img src={data?.image} alt="ImagePost" />}
      <span style={{ color: "var(--gray)", fontSize: "12px" }}>
        {moment(data.createdAt).format("HH:mm:ss")} -{" "}
        {moment(data.createdAt).format("DD/MM/YYYY")}
      </span>
      <span style={{ color: "var(--gray)", fontSize: "12px" }}>
        {like} likes
      </span>

      <div className="line"></div>
      <div className="postReact">
        <div className="postIcon" onClick={handleLike}>
          {liked ? (
            <ThumbUpIcon className="icon" style={{ color: "#0d80d8" }} />
          ) : (
            <ThumbUpOutlinedIcon className="icon" />
          )}
          <span style={liked ? { color: "#0d80d8" } : {}}>likes</span>
        </div>
        <div className="postIcon">
          <ChatBubbleOutlineOutlinedIcon className="icon" />
          <span>comments</span>
        </div>
        <div className="postIcon">
          <RiShareForwardLine className="icon" />
          <span>share</span>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
