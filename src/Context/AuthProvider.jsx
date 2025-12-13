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
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../Hoocks/UseAxiosSecure";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const axiosSecure = UseAxiosSecure();
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
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
    return asyncAction(
      async () => await signInWithEmailAndPassword(auth, email, password)
    );
  };

  const signInWithGoogle = () => {
    return asyncAction(async () => await signInWithPopup(auth, googleProvider));
  };

  const logOut = () => {
    return asyncAction(async () => {
      await signOut(auth);
      setUser(null);
      setRole(null);
    });
  };

  const upDateUserProfile = (profile) => {
    return asyncAction(async () => {
      await updateProfile(auth.currentUser, profile);
      await auth.currentUser.reload();
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setRole(null);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const { data: roleData, isLoading: roleLoading } = useQuery({
    queryKey: ["role", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/roles?email=${user.email}`);
      return res.data;
    },
  });

  useEffect(() => {
    if (roleData?.length > 0) {
      setRole(roleData[0].role);
    }
  }, [roleData]);

  const authInfo = {
    user,
    role,
    loading: loading || roleLoading,
    registerUser,
    signInUser,
    signInWithGoogle,
    logOut,
    setLoading,
    upDateUserProfile,
  };

  if (loading || roleLoading) {
    return (
      <span className="loading loading-spinner loading-xl flex justify-self-center mt-[500px]"></span>
    );
  }

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
