import { useState, useEffect } from "react";
import { auth, db } from "../config/firebase_config";
import { usersRef } from "../config/firebase_config";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const AccountBalance = ({ renderBalance, balance, getBalance }) => {
  // const [balance, setBalance] = useState(10);
  // const [deduction, setDeduction] = useState(0);

  useEffect(() => {
    // renderBalance(user);
    getBalance();
  }, [auth]);
  return (
    <div className="rounded border-black border w-1/2">
      <h1>Balance</h1>
      <p className="font-bold text-3xl text-center">{balance}</p>
    </div>
  );
};

export default AccountBalance;
