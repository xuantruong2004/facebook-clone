import React from "react";
import Posts from "../Posts/Posts";
import Share from "../Share/Share";
import Stories from "../Stories/Stories";
import "./Feed.scss";
const Feed = () => {
  return (
    <div className="Feed">
      <Stories />
      <Share />
      <Posts />
    </div>
  );
};

export default Feed;
