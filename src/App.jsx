import './App.css';
import {
  TwitterAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import app from './Firebase/firebase.init';
import { useState } from 'react';
const auth = getAuth(app);
auth.languageCode = 'it';
const googleProvider = new GoogleAuthProvider();
const twitterProvider = new TwitterAuthProvider();
function App() {
  const [user, setUser] = useState(null);
  // handle Google Sign IN
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        setUser(res.user);
      })
      .catch((error) => {
        alert(error);
      });
  };
  // handleFacebook Sign in
  const handleTwitterSignIn = () => {
    signInWithPopup(auth, twitterProvider)
      .then((res) => {
        setUser(res.user);
      })
      .catch((error) => {
        return alert(error);
      });
  };
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        alert(error);
      });
  };
  console.log(user);
  return (
    <>
      <h1>React-With-Firebase</h1>
      {user ? (
        <>
          <button onClick={handleSignOut}>Sign Out</button> <br />
        </>
      ) : (
        <>
          <button onClick={handleGoogleSignIn}>Sign In Using Google</button>
          <br />
          <button onClick={handleTwitterSignIn}>Sign In Using Twitter</button>
        </>
      )}
      {user && (
        <div>
          <h1>User: {user?.displayName}</h1>
        </div>
      )}
    </>
  );
}

export default App;
