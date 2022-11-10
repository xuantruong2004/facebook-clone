import React, { useState } from "react";
import "./Navbar.scss";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import { BsMessenger, BsBellFill } from "react-icons/bs";
import { CgMenuGridO } from "react-icons/cg";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional
import LogoutIcon from "@mui/icons-material/Logout";

import ImageProfile from "../../img/defaultProfile.jpg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/AuthAction";
import { useEffect } from "react";
import { getSearchUser } from "../../api/UserRequest";
import { useDebounce } from "../../hooks";

const Navbar = () => {
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth.authData);

  const handleClick = () => {
    setModal(!modal);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const [searchValue, setSearchValue] = useState("");
  const [userSearch, setUserSearch] = useState([]);

  const debounce = useDebounce(searchValue, 300);

  useEffect(() => {
    const fetchSearchUser = async () => {
      const { data } = await getSearchUser(debounce.trim().toLowerCase());
      setUserSearch(data);
    };
    if (!searchValue) {
      setUserSearch([]);
    } else {
      fetchSearchUser();
    }
  }, [debounce]);

  const navigate = useNavigate();
  const GotoUser = (id) => {
    navigate(`/profile/${id}`);
    setUserSearch([]);
  };

  const GotoMessage = () => {
    navigate(`/message/${user._id}`);
  };

  return (
    <div className="navbarContainer">
      <div className="navbar-left">
        <Link to={"/"}>
          <FacebookOutlinedIcon className="logoface" />
        </Link>
        <div className="navbar-search">
          <SearchOutlinedIcon className="IconSearch" />
          <input
            type="text"
            placeholder="#Explore"
            className="input"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          {userSearch.length > 0 && (
            <div className="modalSearch">
              {userSearch.map((user) => (
                <div
                  className="userItem"
                  key={user._id}
                  onClick={() => GotoUser(user._id)}
                >
                  <img
                    src={user?.profileImage || ImageProfile}
                    alt=""
                    className="image"
                  />
                  <span>
                    {user?.firstname} {user?.lastname}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="navbar-center">
        <Tippy delay={[100, 100]} content="Home" placement="bottom">
          <NavLink to={"/home"} className="boxIcon">
            <HomeOutlinedIcon className="Icon" />
          </NavLink>
        </Tippy>
        <Tippy delay={[100, 100]} content="Watch" placement="bottom">
          <div className="boxIcon">
            <SubscriptionsOutlinedIcon className="Icon" />
          </div>
        </Tippy>
        <Tippy delay={[100, 100]} content="marketplace" placement="bottom">
          <div className="boxIcon">
            <StorefrontOutlinedIcon className="Icon" />
          </div>
        </Tippy>
        <Tippy delay={[100, 100]} content="game" placement="bottom">
          <div className="boxIcon">
            <SportsEsportsOutlinedIcon className="Icon" />
          </div>
        </Tippy>
      </div>

      <div className="navbar-right">
        <Tippy
          delay={[100, 100]}
          content="Menu"
          placement="bottom"
          className="customTippy"
        >
          <div className="boxIconRight">
            <CgMenuGridO className="Icon" />
          </div>
        </Tippy>
        <Tippy delay={[100, 100]} content="Message" placement="bottom">
          <div className="boxIconRight iconMessage" onClick={GotoMessage}>
            <BsMessenger className="Icon" />
          </div>
        </Tippy>
        <Tippy delay={[100, 100]} content="notification" placement="bottom">
          <div className="boxIconRight">
            <BsBellFill className="Icon" />
          </div>
        </Tippy>

        <div className="boxIconUser" onClick={handleClick}>
          <img
            src={user?.profileImage ? user?.profileImage : ImageProfile}
            alt="imageProfile"
            className="ImageProfile"
          />
          {modal && (
            <div className="modal">
              <NavLink to={`/profile/${user._id}`}>
                <span className="title">
                  <img
                    src={user?.profileImage ? user?.profileImage : ImageProfile}
                    alt="imageProfile"
                    className="image"
                  />
                  {user?.firstname} {user?.lastname}
                </span>
              </NavLink>
              <NavLink onClick={handleLogout}>
                <span className="title">
                  <LogoutIcon className="iconLogout" />
                  <span className="logout"> Logout</span>
                </span>
              </NavLink>
            </div>
          )}
        </div>
      </div>

      {modal && <div className="bgModal" onClick={() => setModal(false)}></div>}
    </div>
  );
};

export default Navbar;
