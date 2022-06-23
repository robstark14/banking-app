import logo from "./logo.svg";
import "./App.css";
import Signup from "./Signup";
import Login from "./Login";
import { useState } from "react";
import Dashboard from "./Dashboard";

function App() {
  const info = {
    email: "robellempajarin@gmail.com",
    firstName: "Jose Robelle",
  };
  const { isAlreadyRegistered, setIsAlreadyRegistered } = useState(true);
  return (
    <div className="App h-screen App flex justify-end items-center">
      {isAlreadyRegistered ? <Login /> : null}
      {/* {!isAlreadyRegistered ? <Signup /> : null} */}
      {/* <Dashboard name={info.firstName} email={info.email} /> */}
    </div>
  );
}

export default App;
