import React, { useEffect, useState } from "react";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import GroupsIcon from "@mui/icons-material/Groups";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import EventIcon from "@mui/icons-material/Event";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import LogoutIcon from "@mui/icons-material/Logout";

import "./LeftSideBar.scss";
import ImageProfile from "../../img/defaultProfile.jpg";
import MenuLink from "./MenuLink";
import UserItem from "./UserItem";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "../../api/UserRequest";
import { logout } from "../../actions/AuthAction";

const LeftSideBar = () => {
  const [persons, setPersons] = useState([]);
  const { user } = useSelector((state) => state.auth.authData);
  useEffect(() => {
    const fetchPersons = async () => {
      const { data } = await getAllUser();
      setPersons(data.filter((person) => person._id !== user._id)); //get person not userId current
    };
    fetchPersons();
  }, []);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div className="LeftSideBar">
      <div className="sideBarList">
        <Link to={`/profile/${user._id}`}>
          <div className="sidebarItem">
            <img
              src={user?.profileImage ? user.profileImage : ImageProfile}
              alt="imageProfile"
              className="ImageItem"
            />
            <span className="title">
              {user?.firstname} {user?.lastname}
            </span>
          </div>
        </Link>

        <MenuLink Icon={PeopleAltIcon} text="ban be" />
        <MenuLink Icon={GroupsIcon} text="Nhom" />
        <MenuLink Icon={StorefrontOutlinedIcon} text="Marketplace" />
        <MenuLink Icon={SubscriptionsOutlinedIcon} text="Watch" />
        <MenuLink Icon={EventIcon} text="Events" />
        <MenuLink Icon={Brightness4Icon} text="Themes" />
        <div onClick={handleLogout}>
          <MenuLink Icon={LogoutIcon} text="Logout" />
        </div>
      </div>
      <div className="UserWrapper">
        <p>People you may know</p>
        <div className="UserList">
          {persons &&
            persons.map((person) => (
              <UserItem key={person._id} person={person} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default LeftSideBar;
