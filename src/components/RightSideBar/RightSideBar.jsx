import React from "react";

import ImageProfile from "../../img/defaultProfile.jpg";
import BoxGit from "../../img/boxgit.jpg";
import UserItem from "../LeftSidebar/UserItem";
import "./RightSideBar.scss";
const RightSideBar = () => {
  return (
    <div className="RightSideBar">
      <div className="TopRight">
        <h5>Happy birthday</h5>
        <div className="happy">
          <div className="contentGit">
            <img src={BoxGit} alt="" className="imgGit" />
          </div>
          <p>
            Hom nay la sinh nhat{" "}
            <span style={{ color: "black", fontWeight: 500 }}>Minh Thao</span>
          </p>
        </div>
      </div>

      <div className="bottom">
        <p>Contact</p>
        <div className="userList"></div>
      </div>
    </div>
  );
};

export default RightSideBar;
