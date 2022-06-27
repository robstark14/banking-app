import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../config/firebase_config";
import { useNavigate } from "react-router-dom";

const Login = ({ formSwitch }) => {
  const navigate = useNavigate();
  const navigateSignUp = () => {
    navigate("/signup");
  };
  const [value, setValue] = useState({
    email: "",
    password: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [validSubmit, setValidSubmit] = useState(false);
  const [error, setError] = useState(false);
  const [showError, setShowError] = useState("");
  const [loginSuccess, setLogInSuccess] = useState(false);

  const userLogIn = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        value.email,
        value.password
      );
      console.log(user);
      setLogInSuccess(true);
    } catch (err) {
      setError(true);
      setShowError(err.message);
    }
  };
  return (
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
          className="input-field"
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
          className="input-field"
          type="password"
          name="password"
          //   required
          value={value.password}
          placeholder="Password"
        />
        {submitted && !value.password ? (
          <p className="warning-input">Please enter your password</p>
        ) : null}

        <button className="btn " type="submit">
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
  );
};

export default Login;
