import { useState, useEffect } from "react";
import { auth, db } from "../config/firebase_config";
import { usersRef } from "../config/firebase_config";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const AccountBalance = ({ balance, getBalance, convertToMoneyFormat }) => {
  useEffect(() => {
    getBalance();
  }, [auth]);
  return (
    <div className="shadow-2xl w-full h-24 grid border-l-4 border-rose-700 p-4 bg-stone-100">
      <div className="flex items-center justify-end text-right">
        <small className="font-bold text-[12px] text-right">PHP </small>
        <p className="font-['Open_Sans'] text-3xl text-stone-500 text-right ml-4">
          {balance === 0 ? "0.00" : convertToMoneyFormat(balance)}
        </p>
      </div>
      <h1 className="text-right text-stone-400 font-thin">Available Balance</h1>
    </div>
  );
};

export default AccountBalance;
