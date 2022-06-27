import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth, usersRef } from "../config/firebase_config";
import { db } from "../config/firebase_config";

import {
  setDoc,
  doc,
  getDocs,
  query,
  collection,
  where,
  addDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
const Signup = ({ user }) => {
  const navigate = useNavigate();
  const navigateLogin = () => {
    navigate("/");
  };
  const navigateUserDashboard = () => {
    navigate("/dashboard");
  };
  const [value, setValue] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [validSubmit, setValidSubmit] = useState(false);
  const [error, setError] = useState(false);
  const [showError, setShowError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState(false);

  // const createUserDocData = async (user, otherData) => {
  //   if (!user) {
  //     return;
  //   }
  //   const userRefId = doc(db, "users", user.uid);
  //   const snapshot = await userRefId.get();

  //   // if (!snapshot.exists) {
  //     const { email } = user;
  //     const { displayName } = otherData;
  //     try {
  //       await setDoc(userRefId, {
  //         displayName,
  //         email,
  //         createdAt: new Date(),
  //       });
  //     } catch (err) {
  //       console.log(err.message);
  //     }
  //   // }
  // };
  const userRegister = async () => {
    // await e.stopPropagation();
    const user = await createUserWithEmailAndPassword(
      auth,
      value.email,
      value.password
    );
    if (!user) {
      return;
    }
    try {
      console.log(user.user.email);
      console.log(user.user.uid);
      const userRefId = doc(db, "users", user.user.uid);
      // const snapshot = await getDoc(userRefId);
      // if (!snapshot.exists) {
      // console.log(doc(db, "users", "user.user.uid"));

      const { email } = user.user;
      const { firstName } = value;
      const { lastName } = value;
      console.log(user.user.uid);
      console.log(collection(db, "users", user.user.uid, "more-details"));
      await addDoc(collection(db, "users", user.user.uid, "user-info"), {
        firstName,
        lastName,
        email,
        createdAt: new Date(),
      });
      await setDoc(
        doc(db, "users", user.user.uid, "account-balance", "balance-doc"),
        {
          balance: 0,
        }
      );
      navigateUserDashboard("/dashboard");
      // const q = query(collection(db, "users"));
      // const querySnapshot = await getDocs(q);
      // console.log(querySnapshot);
      // const queryData = querySnapshot.docs.filter(
      //   (detail) => detail.id === user.user.uid
      // );
      // console.log(queryData);
      // await setDoc(queryData, {
      //   displayName,
      //   email,
      //   createdAt: new Date(),
      // });
      // queryData.map(async (v) => {
      //     await setDoc(doc(db, `users/${v.id}/more-details`, details.name), {
      //         name: details.name,
      //         age: details.age,
      //         currentLocation: details.currLoc,
      //     });
      // })
    } catch (err) {
      console.log(err.message);
      setError(true);
      setShowError(err.message);
      setValue({
        email: (value.email = ""),
        password: (value.password = ""),
        firstName: (value.firstName = ""),
        lastName: (value.lastName = ""),
      });
    }
  };
  const userSignOut = async () => {
    try {
      const user = await signOut(auth);
      console.log(user);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
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
      <h1 className="font-sans mb-6 text-xl font-bold ">Register an Account</h1>
      {registerSuccess && <p className="bg-green-300 px-2 mb-1">Success</p>}
      {error && <p className="bg-red-300 py-1 px-2 mb-1">{showError}</p>}
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
          //   required
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
          //   required
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
          //   required
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
          //   required
          value={value.password}
          placeholder="Password"
        />
        {submitted && !value.password ? (
          <p className="text-red-500 py-1 px-2 mb-1 text-sm">
            Please enter your password
          </p>
        ) : null}

        <button className="btn" type="submit">
          Submit
        </button>
        <button className="btn" onClick={userSignOut}>
          Logout
        </button>
        <p className="mt-4 text-sm text-center">
          Already Registered?{" "}
          <button className="text-blue-500" onClick={navigateLogin}>
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default Signup;
