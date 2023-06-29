import { useEffect, useState } from "react";
import "./App.css";
import Post from "./Post";
import { db } from "./firebase";
import { collection, onSnapshot } from "firebase/firestore";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "posts"), (snapshot) => {
      setPosts(snapshot.docs.map((doc) => doc.data()));
    });

    return () => unsubscribe();
  }, []);
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
