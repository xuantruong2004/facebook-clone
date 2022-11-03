import React from "react";
import InfoProfile from "../InfoProfile/InfoProfile";
import Posts from "../Posts/Posts";
import Share from "../Share/Share";
import "./ProfileRight.scss";
const ProfileRight = ({ profileUser }) => {
  return (
    <div className="ProfileRight">
      {/* info Profile */}

      <InfoProfile profileUser={profileUser} />
      <Share />
      <Posts location="profilePage" profileUser={profileUser} />
    </div>
  );
};

export default ProfileRight;
