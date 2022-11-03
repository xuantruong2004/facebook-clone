import React from "react";
import Feed from "../../components/Feed/Feed";
import LeftSideBar from "../../components/LeftSidebar/LeftSideBar";
import Navbar from "../../components/Navbar/Navbar";
import RightSideBar from "../../components/RightSideBar/RightSideBar";
import "./Home.scss";
const Home = () => {
  return (
    <div className="HomeContainer">
      <Navbar />
      <div className="MainContainer">
        {/* left sidebar */}
        <LeftSideBar />

        {/* feed center */}
        <Feed />

        {/* Right sidebar */}
        <RightSideBar />
      </div>
    </div>
  );
};

export default Home;
