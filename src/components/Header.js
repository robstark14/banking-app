import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../config/firebase_config";
import logo from "../logo.png";
import { useAuthUser } from "./context/AuthUserContextProvider";
const Header = ({ setIsAuth }) => {
  const { user, logOut } = useAuthUser();
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const data = await getDoc(doc(db, "users", user.uid));
          setUserName(data.data());
          console.log("username??", data.data());
        } catch (err) {
          console.log(err.message);
        }
      }
    });
  }, [auth]);
  const userSignOut = async () => {
    try {
      await logOut();
      console.log("hello");
      setIsAuth(false);
      indexedDB.deleteDatabase("firebaseLocalStorageDb");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="h-14 w-screen bg-red-800  absolute text-white top-0 left-0 flex  items-center justify-between shadow-sm">
      <img src={logo} className="h-3/4 pl-8 " alt="bank logo" />
      <div className="w-1/4 h-3/4 flex justify-around items-center">
        <strong>
          {userName.firstName} {userName.lastName}
        </strong>
        <button
          onClick={userSignOut}
          className="flex items-center hover:bg-red-900 rounded p-1"
        >
          Logout <span class="material-symbols-outlined pl-1">logout</span>
        </button>
      </div>
    </div>
  );
};

export default Header;

// rgb(243 244 246)
