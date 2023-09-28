import './App.css';
import { getAuth, signInWithPopup, signOut } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import app from './Firebase/firebase.init';
import { useState } from 'react';
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
function App() {
  const [user, setUser] = useState(null);
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((res) => {
        setUser(res.user);
      })
      .catch((error) => {
        alert(error);
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
        <button onClick={handleSignOut}>Sign Out</button>
      ) : (
        <button onClick={handleGoogleSignIn}>Sign In</button>
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
