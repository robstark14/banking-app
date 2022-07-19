import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useEffect, useState, createContext, useContext } from "react";
import { auth } from "../../config/firebase_config";

const authUserContext = createContext();
// const accountNumberContext = createContext();
export const AuthUserContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [accountNumber, setAccountNumber] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log(currentUser);

      const randomNumber = Math.floor(Math.random() * 900000000) + 100000000;
      setAccountNumber(randomNumber.toString().padStart(10, "0"));
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const logIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logOut = () => {
    return signOut(auth);
  };

  return (
    <authUserContext.Provider
      value={{ user, logIn, signUp, logOut, accountNumber }}
    >
      {children}
    </authUserContext.Provider>
  );
};

export function useAuthUser() {
  return useContext(authUserContext);
}
// export function useAccountNumber() {
//   return useContext(accountNumberContext);
// }
