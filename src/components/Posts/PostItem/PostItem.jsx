import React, { useState } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp"; //like
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined"; //notlike
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { RiShareForwardLine } from "react-icons/ri";
import moment from "moment/moment";

import "./PostItem.scss";
import PostPic1 from "../../../img/defaultProfile.jpg";
import { useSelector } from "react-redux";
import { likePost } from "../../../api/PostRequest";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { uploadComment } from "../../../api/UploadRequest";
import { useEffect } from "react";
import { getComment } from "../../../api/CommentRequest";
import Comment from "../Comment/Comment";

const PostItem = ({ data, persons }) => {
  const id = data._id;
  const { user } = useSelector((state) => state.auth.authData);
  const [liked, setLiked] = useState(data.like.includes(user._id));
  const [like, setLike] = useState(data.like.length);
  const [comments, setComments] = useState([]);
  const [seeMore, setSeeMore] = useState(false);

  const userId = persons.find((person) => person._id === data.userId);

  const handleLike = () => {
    likePost(data._id, user._id);
    setLiked(!liked);
    liked ? setLike((prev) => prev - 1) : setLike((prev) => prev + 1);
  };

  const navigate = useNavigate();
  const GotoProfile = (id) => {
    navigate(`/profile/${id}`);
  };

  const desc = useRef();
  const handleComment = async () => {
    const comment = {
      postId: id,
      userId: user._id,
      desc: desc.current.value,
    };
    const { data } = await uploadComment(comment);

    setComments((prev) => [data, ...prev]);
    desc.current.value = "";
  };

  useEffect(() => {
    const fetchComment = async () => {
      const comments = await getComment(data._id);
      setComments(comments.data);
    };

    fetchComment();
  }, []);

  return (
    <div className="PostItem">
      <div className="userPost">
        <img
          src={userId?.profileImage ? userId?.profileImage : PostPic1}
          alt="imageUser"
          onClick={() => GotoProfile(userId._id)}
        />
        <span onClick={() => GotoProfile(userId._id)}>
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

      <div className="line"></div>

      <div className="userComment">
        <div className="imageUser" onClick={() => GotoProfile(user._id)}>
          <img
            src={user?.profileImage ? user?.profileImage : PostPic1}
            alt="imageProofile"
          />
        </div>
        <div className="input">
          <input
            type="text"
            placeholder="write a comment"
            ref={desc}
            required
          />
        </div>
        <button onClick={handleComment}>send</button>
      </div>
      {comments.length > 3 && (
        <div className="seeMore">
          <span onClick={() => setSeeMore(!seeMore)}>See more</span>
        </div>
      )}

      {!seeMore &&
        comments.length <= 3 &&
        comments.map((comment) => (
          <Comment comment={comment} key={comment._id} persons={persons} />
        ))}

      {!seeMore &&
        comments.length > 3 &&
        comments
          .filter((comment, index) => index < 3)
          .map((comment) => (
            <Comment comment={comment} key={comment._id} persons={persons} />
          ))}

      {seeMore &&
        comments.map((comment) => (
          <Comment comment={comment} key={comment._id} persons={persons} />
        ))}
    </div>
  );
};

export default PostItem;
