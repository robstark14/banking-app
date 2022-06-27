import logo from "./logo.svg";
import "./App.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { useState } from "react";
import Dashboard from "./components/Dashboard";
import { Routes, Route } from "react-router-dom";
import Deposit from "./components/Deposit";
import NoMatch from "./components/NoMatch";

function App() {
  return (
    <div className="App h-screen w-screen flex justify-center items-center  ">
      {/* <div className="flex justify-end items-center bg-[url('../public/bgd-login2.png')] w-screen h-screen bg-no-repeat bg-[length:1400px_750px]"> */}
      {/* {formSwitchComponent} */}
      {/* </div> */}
      <Routes>
        <Route
          path="/"
          element={
            <div className="flex justify-end items-center bg-[url('../public/bgd-login2.png')] w-screen h-screen bg-no-repeat bg-[length:1400px_750px]">
              <Login />
            </div>
          }
        />
        <Route
          path="/signup"
          element={
            <div className="flex justify-end items-center bg-[url('../public/bgd-login2.png')] w-screen h-screen bg-no-repeat bg-[length:1400px_750px]">
              <Signup />
            </div>
          }
        />
        <Route path="/dashboard/*" element={<Dashboard />} />
        {/* <Route path="/deposit" element={<Deposit />} /> */}
      </Routes>
    </div>
  );
}

export default App;
