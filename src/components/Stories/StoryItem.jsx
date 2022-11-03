import React from "react";

const StoryItem = ({ PostPic, name }) => {
  return (
    <div className="storiesItem">
      <img src={PostPic} alt="postPic" className="bgPicture" />
      <div className="overlay"></div>
      <img src={PostPic} alt="postPic" className="imageProfile" />
      <span className="name">{name}</span>
    </div>
  );
};

export default StoryItem;
