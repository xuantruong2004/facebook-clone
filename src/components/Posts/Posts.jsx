import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostItem from "./PostItem/PostItem";
import { getTimelinePosts } from "../../actions/PostAction";
import { getAllUser } from "../../api/UserRequest";
import * as PostApi from "../../api/PostRequest";

import "./Posts.scss";
import { useState } from "react";

const Posts = ({ location, profileUser }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth.authData);
  let { posts, loading } = useSelector((state) => state.post);
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    if (profileUser) {
      dispatch(getTimelinePosts(profileUser._id));
    } else {
      dispatch(getTimelinePosts(user._id));
    }

    const fetchPersons = async () => {
      const { data } = await getAllUser();
      setPersons(data);
    };
    fetchPersons();
  }, []);

  if (location === "profilePage") {
    if (profileUser) {
      const postProfile = posts.filter(
        (post) => post.userId === profileUser._id
      );
      posts = postProfile;
    } else {
      const postProfile = posts.filter((post) => post.userId === user._id);
      posts = postProfile;
    }
  }

  return (
    <div className="PostList">
      {posts &&
        posts.map((post) => (
          <PostItem key={post._id} data={post} persons={persons} />
        ))}
    </div>
  );
};

export default Posts;
