import React, { useState } from "react";
import "./userItem.scss";
import ImageProfile from "../../img/defaultProfile.jpg";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unFollowUser } from "../../actions/UserAction";
import { Link, useNavigate } from "react-router-dom";

const UserItem = ({ person }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth.authData);
  const [following, setFollowing] = useState(
    person.followers.includes(user._id)
  );
  const handleFollow = (e) => {
    e.stopPropagation();
    following
      ? dispatch(unFollowUser(person._id, user))
      : dispatch(followUser(person._id, user));

    setFollowing((prev) => !prev);
  };

  const navigate = useNavigate();
  const GotoProfile = () => {
    navigate(`/profile/${person._id}`);
  };
  return (
    <div className="sidebarItem" onClick={GotoProfile}>
      <div className="infoUser">
        <img
          src={person?.profileImage || ImageProfile}
          alt="imageProfile"
          className="ImageItem"
        />
        <span className="title">
          {person?.firstname} {person?.lastname}
        </span>
      </div>
      <button
        className={following ? "unfollow" : "btnFollow"}
        onClick={handleFollow}
      >
        {following ? "unfollow" : "follow"}
      </button>
    </div>
  );
};

export default UserItem;
