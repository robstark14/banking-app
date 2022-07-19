import logo from "./logo.svg";
import "./App.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Deposit from "./components/Deposit";
import NoMatch from "./components/NoMatch";
import Header from "./components/Header";
import {
  AuthUserContextProvider,
  useAuthUser,
} from "./components/context/AuthUserContextProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase_config";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();

  const checkUserAuth = async () => {
    onAuthStateChanged(auth, (user) => {
      if (user !== null && user !== "undefined") {
        setIsAuth(true);
      }
    });
  };
  useEffect(() => {
    checkUserAuth();

    return () => checkUserAuth();
  }, [isAuth]);
  return (
    <div className="App h-screen w-screen flex justify-center items-center  ">
      <AuthUserContextProvider>
        <Routes>
          <Route path="*" element={!isAuth ? <Login /> : <Dashboard />} />
          <Route
            path="/signup"
            element={
              !isAuth ? (
                <Signup setIsLoggedIn={setIsLoggedIn} isLoggedin={isLoggedIn} />
              ) : (
                <Dashboard />
              )
            }
          />

          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute>
                <Dashboard setIsAuth={setIsAuth} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthUserContextProvider>
    </div>
  );
}

export default App;

//expense edit and delete icons and forms
//fix transfer to recipient bug
//fix logo and add animation
//Account maintenance?
//font google
