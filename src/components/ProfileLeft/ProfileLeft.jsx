import React, { useState } from "react";

import "./ProfileLeft.scss";
import { useDispatch } from "react-redux";
import { logout } from "../../actions/AuthAction";
const ProfileLeft = ({ profileUser }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <div className="infoCard">
        <div className="infoHead">
          <h4>Profile Info</h4>
        </div>
        <div className="info">
          <span>
            <b>status:</b>
          </span>
          {profileUser?.relationship && <span>{profileUser.relationship}</span>}
        </div>
        <div className="info">
          <span>
            <b>lives in:</b>
          </span>
          {profileUser?.livesin && <span>{profileUser.livesin}</span>}
        </div>
        <div className="info">
          <span>
            <b>Works:</b>
          </span>
          {profileUser?.worksAt && <span>{profileUser.worksAt}</span>}
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileLeft;
