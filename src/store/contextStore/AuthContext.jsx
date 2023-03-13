import { useContext, createContext, useEffect, useState } from 'react';
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

import { auth } from '../../firebase';

//To be used as a provider
const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();  
    signInWithPopup(auth, provider);
  };
  const githubSignIn = () => {
    const provider = new GithubAuthProvider();  
    signInWithPopup(auth, provider);
  };

  const logOut = () =>{
    signOut(auth)
  }

  useEffect(() => {
    console.log('🍑🍑🍑🍑', auth)
    //get user info
    const unsubscribe = onAuthStateChanged(auth,(currentUser) => {
      setUser(currentUser)
      console.log('User', currentUser)
    })
    //cleanup to prevent memory leak (look at notes)
    return () => {
      unsubscribe();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ googleSignIn, githubSignIn, logOut, user }}>
      {children}
    </AuthContext.Provider>
  );
};

//To consume context and provide user with data/value
export const UserAuth = () => {
  return useContext(AuthContext);
};
