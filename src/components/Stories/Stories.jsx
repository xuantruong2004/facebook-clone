import React from "react";
import PostPic1 from "../../img/postpic1.jpg";
import PostPic2 from "../../img/postpic2.jpg";
import PostPic3 from "../../img/postpic3.JPG";
import "./Stories.scss";
import StoryItem from "./StoryItem";

const Stories = () => {
  return (
    <div className="storiesWrapper">
      <StoryItem PostPic={PostPic1} name="Anna" />
      <StoryItem PostPic={PostPic2} name="baby" />
      <StoryItem PostPic={PostPic3} name="Jenifer" />
      <StoryItem PostPic={PostPic3} name="kenny" />
    </div>
  );
};

export default Stories;
