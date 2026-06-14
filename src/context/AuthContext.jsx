import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Register
  const register = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  // Update Profile
  const updateUserProfile = (name, photo) =>
    updateProfile(auth.currentUser, { displayName: name, photoURL: photo });

  // Login
  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  // Google Login
  const googleLogin = () => signInWithPopup(auth, googleProvider);

  // Logout
  const logout = () => signOut(auth);

  // Auth State Observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // JWT token নাও
        const res = await axios.post("https://ideavault-server-one.vercel.app/users/jwt", {
          email: currentUser.email,
        });
        localStorage.setItem("token", res.data.token);
      } else {
        localStorage.removeItem("token");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const value = { user, loading, register, updateUserProfile, login, googleLogin, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;