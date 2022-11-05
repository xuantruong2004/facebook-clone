import React, { useEffect } from "react";
import { AiFillEdit } from "react-icons/ai";
import ProfileModal from "../ProfileModal/ProfileModal";
import * as PostApi from "../../api/PostRequest";

import UserImage from "../../img/defaultProfile.jpg";
import CoverImage from "../../img/cover.jpg";
import "./InfoProfile.scss";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTimelinePosts } from "../../actions/PostAction";
import { followUser, unFollowUser } from "../../actions/UserAction";
const InfoProfile = ({ profileUser }) => {
  const dispatch = useDispatch();
  const [modalOpened, setModalOpened] = useState(false);
  const { user } = useSelector((state) => state.auth.authData);
  let { posts, loading } = useSelector((state) => state.post);

  const [following, setFollowing] = useState();

  const handleFollow = () => {
    following
      ? dispatch(unFollowUser(profileUser._id, user))
      : dispatch(followUser(profileUser._id, user));
    setFollowing((prev) => !prev);
  };

  useEffect(() => {
    dispatch(getTimelinePosts(profileUser._id));
    if (profileUser?.followers) {
      setFollowing(profileUser.followers.includes(user._id));
    }
  }, [profileUser?._id]);
  return (
    <div className="InfoProfile">
      <div className="ImageProfile">
        <img
          className="coverImage"
          src={profileUser?.coverImage ? profileUser.coverImage : CoverImage}
          alt="coverImage"
        />
        <img
          src={profileUser?.profileImage ? profileUser.profileImage : UserImage}
          alt="profileImage"
          className="userImage"
        />
        {user._id === profileUser._id && (
          <div
            className="edit"
            onClick={() => {
              setModalOpened(true);
            }}
          >
            <AiFillEdit />
            <span>Edit profile</span>
          </div>
        )}
        <ProfileModal
          modalOpened={modalOpened}
          setModalOpened={setModalOpened}
          data={user}
        />

        {user._id !== profileUser._id && (
          <button
            className={following ? "unfollow" : "follow"}
            onClick={handleFollow}
          >
            {following ? "unfollow" : "follow"}
          </button>
        )}
      </div>
      <div className="info">
        <h4>
          {" "}
          {profileUser?.firstname} {profileUser?.lastname}
        </h4>
        <p>
          {profileUser.worksAt ? profileUser.worksAt : "write about yourself"}
        </p>
      </div>
      <div className="information">
        <div className="box">
          {profileUser?.followings && (
            <span>{profileUser?.followings.length}</span>
          )}
          <span>followings</span>
        </div>
        <div className="box">
          {profileUser?.followers && (
            <span>{profileUser?.followers.length}</span>
          )}
          <span>follower</span>
        </div>
        <div className="box">
          <span>
            {posts.filter((post) => post.userId === profileUser._id).length}
          </span>
          <span>posts</span>
        </div>
      </div>
    </div>
  );
};

export default InfoProfile;
