import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.init";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  
  const asyncAction = async (fn) => {
    try {
      setLoading(true);
      const result = await fn();
      return result;
    } finally {
      setLoading(false);
    }
  };

  const registerUser = (email, password) => {
    return asyncAction(() =>
      createUserWithEmailAndPassword(auth, email, password)
    );
  };

  const signInUser = (email, password) => {
    return asyncAction(() => signInWithEmailAndPassword(auth, email, password));
  };

  const signInWithGoogle = () => {
    return asyncAction(() => signInWithPopup(auth, googleProvider));
  };

  const logOut = () => {
    return asyncAction(() => signOut(auth));
  };

  const upDateUserProfile = (profile) => {
    return asyncAction(() => updateProfile(auth.currentUser, profile));
  };

  // ✅ Auth State Observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // ✅ important
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    registerUser,
    signInUser,
    signInWithGoogle,
    logOut,
    setLoading,
    upDateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
