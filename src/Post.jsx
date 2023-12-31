import React from "react";
import "./Post.css";
import { Avatar } from "@mui/material";

const Post = ({ imageUrl, username, caption }) => {
  return (
    <>
      <div className='post'>
        <div className='post__header'>
          <Avatar
            className='post__avatar'
            alt='Remy Sharp'
            src='/static/images/avatar/1.jpg'
          />
          <h3>{username}</h3>
        </div>
        <img className='post__image' src={imageUrl} alt='' />
        <h4 className='post__text'>
          <strong style={{ margin: " 0px 2px" }}>{username}</strong>: {caption}
        </h4>
      </div>
    </>
  );
};

export default Post;
