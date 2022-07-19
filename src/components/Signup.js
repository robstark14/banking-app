import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth, usersRef } from "../config/firebase_config";
import { db } from "../config/firebase_config";
import { useAuthUser } from "./context/AuthUserContextProvider";

import {
  setDoc,
  doc,
  getDocs,
  query,
  collection,
  where,
  addDoc,
  serverTimestamp,
  Transaction,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [submitted, setSubmitted] = useState(false);
  const [validSubmit, setValidSubmit] = useState(false);
  const [error, setError] = useState(false);
  const [showError, setShowError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [value, setValue] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const navigateLogin = () => {
    navigate("/");
  };
  const navigateUserDashboard = () => {
    navigate("/dashboard");
  };
  const { signUp, user, accountNumber } = useAuthUser();

  const userRegister = async () => {
    try {
      await signUp(value.email, value.password);
      console.log(user.uid);
    } catch (err) {
      console.log(err);
      setError(true);
      setShowError(err.message);
      // setValue({
      //   email: (value.email = ""),
      //   password: (value.password = ""),
      //   firstName: (value.firstName = ""),
      //   lastName: (value.lastName = ""),
      // });
    }
  };
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setDoc(doc(db, "users", user.uid), {
        firstName: value.firstName,
        lastName: value.lastName,
        email: value.email,
        accountNumber: accountNumber,
        createdAt: serverTimestamp(),
        id: user.uid,
      });
      setDoc(doc(db, "users", user.uid, "account-balance", "balance-doc"), {
        balance: 0,
      });
      navigateUserDashboard();
      // await setDoc(doc(db, "users", user.uid), {
      //   accountNumber: accountNumber,
      // });
    }
  });
  // onAuthStateChanged(auth, (user) => {
  //   setDoc(
  //     collection(db, "users", user.uid, "user-info"),
  //     {
  //       firstName: value.firstName,
  //       lastName: value.lastName,
  //       email: value.email,
  //       createdAt: serverTimestamp(),
  //     },
  //     { merge: true }
  //   );
  //   setDoc(
  //     doc(
  //       db,
  //       "users",
  //       user.uid,
  //       "user-accounts",
  //       accountNumber,
  //       "account-balance",
  //       "balance-doc"
  //     ),
  //     {
  //       balance: 0,
  //     },
  //     { merge: true }
  //   );
  // });
  return (
    <div className="flex justify-end items-center bg-[url('../public/bgd-login2.png')] w-screen h-screen bg-no-repeat bg-[length:1400px_750px]">
      <div className="modal-form ">
        {/* {submitted && validSubmit ? (
        <p className="bg-green-300 py-1 px-2 mb-1">
          Success! Please{" "}
          <a className="text-blue-500" href="/">
            sign in
          </a>{" "}
          continue
        </p>
      ) : null} */}
        <h1 className="font-sans mb-6 text-xl font-bold ">
          Register an Account
        </h1>
        {registerSuccess && <p className="bg-green-300 px-2 mb-1">Success</p>}
        {error && <p className="bg-red-300 py-1 px-2 mb-1 h-8">{showError}</p>}
        <form
          className="flex flex-col columns-1"
          onSubmit={(e) => {
            e.preventDefault();
            if (
              value.email &&
              value.password &&
              value.firstName &&
              value.lastName
            ) {
              setValidSubmit(true);

              // setValue({
              //   firstName: (value.firstName = ""),
              //   lastName: (value.lastName = ""),
              //   email: (value.email = ""),
              //   password: (value.password = ""),
              //   confirmPassword: (value.confirmPassword = ""),
              // });
              setSubmitted(true);
              userRegister();

              // createUserDocData();
            }
          }}
        >
          <input
            onChange={(e) => {
              setValue({ ...value, firstName: e.target.value });
            }}
            className="input-field"
            type="name"
            name="displayName"
            value={value.firstName}
            placeholder="First Name"
          />
          {submitted && !value.email ? (
            <p className="text-red-500 py-1 px-2 mb-1 text-sm">
              Please enter your first name
            </p>
          ) : null}
          <input
            onChange={(e) => {
              setValue({ ...value, lastName: e.target.value });
            }}
            className="input-field"
            type="name"
            name="displayName"
            value={value.lastName}
            placeholder="Last Name"
          />
          {submitted && !value.email ? (
            <p className="text-red-500 py-1 px-2 mb-1 text-sm">
              Please enter your last name
            </p>
          ) : null}
          <input
            onChange={(e) => {
              setValue({ ...value, email: e.target.value });
            }}
            className="input-field"
            type="email"
            name="email"
            value={value.email}
            placeholder="Email"
          />
          {submitted && !value.email ? (
            <p className="text-red-500 py-1 px-2 mb-1 text-sm">
              Please enter your email
            </p>
          ) : null}
          <input
            onChange={(e) => {
              setValue({ ...value, password: e.target.value });
            }}
            className="input-field"
            type="password"
            name="password"
            value={value.password}
            placeholder="Password"
          />
          {submitted && !value.password ? (
            <p className="text-red-500 py-1 px-2 mb-1 text-sm">
              Please enter your password
            </p>
          ) : null}

          <button className="btn m-auto mt-4" type="submit">
            Submit
          </button>
          <p className="mt-4 text-sm text-center">
            Already Registered?{" "}
            <button className="text-blue-500" onClick={navigateLogin}>
              Login
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
