import { useState } from "react";
import "./App.css";
import Post from "./Post";

function App() {
  const [posts, setposts] = useState([
    {
      username: "Kushagra",
      imageUrl:
        "https://cdn-media-2.freecodecamp.org/w1280/5f9c9bd4740569d1a4ca2e24.jpg",
      caption: "My Attitude Mah Life",
    },
    {
      username: "Yashu",
      imageUrl:
        "https://cdn-media-2.freecodecamp.org/w1280/5f9c9bd4740569d1a4ca2e24.jpg",
      caption: "My Attitude Mah Life",
    },
  ]);
  return (
    <>
      <div className='app'>
        <div className='app__header'>
          <img
            className='app__headerImage'
            src='https://lh3.googleusercontent.com/2sREY-8UpjmaLDCTztldQf6u2RGUtuyf6VT5iyX3z53JS4TdvfQlX-rNChXKgpBYMw'
            height='40px'
            alt=''
          />
        </div>
        <h1>Hello Kushagra we are building Instagram clone</h1>
        {/* Header */}
        {posts?.map((post, idx) => (
          <Post
            key={idx}
            username={post.username}
            imageUrl={post.imageUrl}
            caption={post.caption}
          />
        ))}
      </div>
    </>
  );
}

export default App;
