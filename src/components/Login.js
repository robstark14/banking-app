import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../config/firebase_config";
import { useNavigate } from "react-router-dom";
import { useAuthUser } from "./context/AuthUserContextProvider";

const Login = () => {
  const [value, setValue] = useState({
    email: "",
    password: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [validSubmit, setValidSubmit] = useState(false);
  const [error, setError] = useState(false);
  const [showError, setShowError] = useState("");
  const [loginSuccess, setLogInSuccess] = useState(false);
  const navigate = useNavigate();
  const { logIn } = useAuthUser();

  const navigateSignUp = () => {
    navigate("/signup");
  };

  const userLogIn = async () => {
    try {
      await logIn(value.email, value.password);
      setLogInSuccess(true);
      navigate("/dashboard");
    } catch (err) {
      setError(true);
      setShowError(err.message);
    }
  };
  return (
    <div className="flex justify-end items-center bg-[url('../public/bgd-login2.png')] w-screen h-screen bg-no-repeat bg-[length:1400px_750px]">
      <div className="modal-form">
        {/* {submitted && validSubmit ? (
        <p className="bg-green-300 py-1 px-2 mb-1">
          Success! Please{" "}
          <a className="text-blue-500" href="/">
            sign in
          </a>{" "}
          continue
        </p>
      ) : null} */}
        <h1 className="font-sans mb-10 text-xl font-bold ">
          Log in to your Account
        </h1>
        {loginSuccess && <p className="bg-green-300 px-2 mb-1">Success</p>}
        {error && <p className="bg-red-300 py-1 px-2 mb-1">{showError}</p>}
        <form
          className="flex flex-col columns-1 items-center"
          onSubmit={(e) => {
            e.preventDefault();
            if (value.email && value.password) {
              setValidSubmit(true);
              userLogIn();
              // setValue({
              //   firstName: (value.firstName = ""),
              //   lastName: (value.lastName = ""),
              //   email: (value.email = ""),
              //   password: (value.password = ""),
              //   confirmPassword: (value.confirmPassword = ""),
              // });
            }
            // setSubmitted(true);
          }}
        >
          <input
            onChange={(e) => {
              setValue({ ...value, email: e.target.value });
            }}
            className="form-input-field"
            type="email"
            name="email"
            //   required
            value={value.email}
            placeholder="Email"
          />
          {submitted && !value.email ? (
            <p className="warning-input">Please enter your email</p>
          ) : null}
          <input
            onChange={(e) => {
              setValue({ ...value, password: e.target.value });
            }}
            className="form-input-field"
            type="password"
            name="password"
            //   required
            value={value.password}
            placeholder="Password"
          />
          {submitted && !value.password ? (
            <p className="warning-input">Please enter your password</p>
          ) : null}

          <button className="btn mt-4" type="submit">
            Log in
          </button>
          <p className="mt-4 text-sm">
            Don't have account yet?{" "}
            <button className="text-blue-500" onClick={navigateSignUp}>
              Sign up
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
