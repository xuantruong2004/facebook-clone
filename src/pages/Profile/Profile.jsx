import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import ProfileLeft from "../../components/ProfileLeft/ProfileLeft";
import ProfileRight from "../../components/ProfileRight/ProfileRight";
import * as UserApi from "../../api/UserRequest.js";

import "./Profile.scss";

const Profile = () => {
  const { user } = useSelector((state) => state.auth.authData);
  const [profileUser, setProfileUser] = useState({});

  const params = useParams();
  const profileUserId = params.id;

  useEffect(() => {
    const fetchProfileUser = async () => {
      if (profileUserId === user._id) {
        setProfileUser(user);
      } else {
        const profileUser = await UserApi.getUser(profileUserId);
        setProfileUser(profileUser.data);
      }
    };
    fetchProfileUser();
    window.scrollTo(0, 0);
  }, [profileUserId, user]);

  return (
    <div className="profile">
      <Navbar />

      <div className="profileContainer">
        {/* Profile Left */}
        <div className="Left">
          <ProfileLeft profileUser={profileUser} />
        </div>

        <div className="Right">
          <ProfileRight profileUser={profileUser} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
