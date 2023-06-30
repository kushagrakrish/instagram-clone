import { Box, Button, Input, Modal } from "@mui/material";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import "./App.css";
import Post from "./Post";
import { auth, db } from "./firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 10,
};

function App() {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [formValues, setFormValues] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [user, setUser] = useState(null);
  const [openSignIn, setOpenSignIn] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const singUp = (e) => {
    e.preventDefault();
    handleClose();
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, formValues.email, formValues.password)
      .then((userCredential) => {
        const user = userCredential.user;
        return updateProfile(user, {
          displayName: formValues.userName,
        });
      })
      .then(() => {
        // Profile updated successfully
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const signIn = (e) => {
    e.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, formValues.email, formValues.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        alert(error.message);
      });
    setOpenSignIn(false);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user, formValues.userame]);
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "posts"), (snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }))
      );
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <div className='app'>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={{ ...style }}>
            <form className='app__signup'>
              <center>
                <img
                  className='app__headerImage'
                  src='https://lh3.googleusercontent.com/2sREY-8UpjmaLDCTztldQf6u2RGUtuyf6VT5iyX3z53JS4TdvfQlX-rNChXKgpBYMw'
                  alt=''
                />
              </center>
              <Input
                name='userName'
                placeholder='username'
                type='text'
                value={formValues.userName}
                onChange={handleChange}
              />
              <Input
                name='email'
                placeholder='email'
                type='text'
                value={formValues.email}
                onChange={handleChange}
              />
              <Input
                name='password'
                placeholder='password'
                type='password'
                value={formValues.password}
                onChange={handleChange}
              />
              <Button type='submit' onClick={singUp}>
                Sign Up
              </Button>
            </form>
          </Box>
        </Modal>

        <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
          <Box sx={{ ...style }}>
            <form className='app__signup'>
              <center>
                <img
                  className='app__headerImage'
                  src='https://lh3.googleusercontent.com/2sREY-8UpjmaLDCTztldQf6u2RGUtuyf6VT5iyX3z53JS4TdvfQlX-rNChXKgpBYMw'
                  alt=''
                />
              </center>
              <Input
                name='email'
                placeholder='email'
                type='text'
                value={formValues.email}
                onChange={handleChange}
              />
              <Input
                name='password'
                placeholder='password'
                type='password'
                value={formValues.password}
                onChange={handleChange}
              />
              <Button type='submit' onClick={signIn}>
                Sign In
              </Button>
            </form>
          </Box>
        </Modal>

        <div className='app__header'>
          <img
            style={{ width: "40px", borderRadius: "999px" }}
            className='app__headerImage'
            src='https://lh3.googleusercontent.com/2sREY-8UpjmaLDCTztldQf6u2RGUtuyf6VT5iyX3z53JS4TdvfQlX-rNChXKgpBYMw'
            alt=''
          />
        </div>
        {user ? (
          <div className='app__logoutContainer'>
            <Button onClick={() => auth.signOut()}>Logout</Button>
          </div>
        ) : (
          <div className='app__loginContainer'>
            <Button onClick={() => setOpen(true)}>Sign Up</Button>
            <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
          </div>
        )}
        <h1>Hello Kushagra we are building Instagram clone</h1>
        {/* Header */}
        {posts?.map(({ post, id }) => (
          <Post
            key={id}
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
