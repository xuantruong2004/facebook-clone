import React from "react";
import PostPic1 from "../../../img/defaultProfile.jpg";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";

const Comment = ({ comment, persons }) => {
  const userId = persons.find((person) => person._id === comment.userId);

  const navigate = useNavigate();
  const GotoProfile = () => {
    navigate(`/profile/${userId._id}`);
  };
  return (
    <div className="getComment">
      <div className="imageUser" onClick={GotoProfile}>
        <img
          src={userId?.profileImage ? userId?.profileImage : PostPic1}
          alt="imageProofile"
        />
      </div>
      <div className="comment">
        <span className="name" onClick={GotoProfile}>
          {userId?.firstname} {userId?.lastname}
        </span>
        <span className="desc">{comment.desc}</span>
        <div className="time">
          <span>{moment(comment?.createdAt).startOf("second").fromNow()}</span>
        </div>
      </div>
    </div>
  );
};

export default Comment;
