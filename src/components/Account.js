import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { auth, db } from "../config/firebase_config";
import AccountBalance from "./AccountBalance";
import { useAuthUser } from "./context/AuthUserContextProvider";

const Account = ({
  balance,
  updateExpenseHistory,
  getBalance,
  convertToMoneyFormat,
}) => {
  const { user } = useAuthUser();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        getAllTransactions();
        console.log(user);
      }
    });
  }, [user]);

  const getAllTransactions = () => {
    const allTransactions = query(
      collection(db, "users", user.uid, "transactions"),
      orderBy("date", "desc")
    );
    onSnapshot(allTransactions, (snapshot) =>
      setTransactions(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      )
    );
  };

  const renderAllTransactions = transactions?.map((item) => (
    <div
      key={item.id}
      className="text-black-700 w-full h-full grid grid-cols-[1fr,4fr,3fr] text-right  border-y p-4"
    >
      <span className="text-center">
        {new Date(Date.now() - item.date.seconds).toDateString().slice(4)}
      </span>
      <div className="grid grid-rows-2 text-right">
        <strong>{item.transaction}</strong>
        <small>
          {item.transaction === "Deposit"
            ? null
            : item.transaction === "Withdrawal"
            ? null
            : item.toFrom}
        </small>
      </div>
      <span>
        <small className="text-italic">PHP </small>
        {item.transaction === "Deposit"
          ? convertToMoneyFormat(item?.depositAmount)
          : item.transaction === "Withdrawal"
          ? "-" + convertToMoneyFormat(item?.withdrawalAmount)
          : item.transaction === "Money Transfer"
          ? "-" + convertToMoneyFormat(item?.transferAmount)
          : null}
      </span>
    </div>
  ));

  return (
    <div>
      <AccountBalance
        balance={balance}
        getBalance={getBalance}
        updateExpenseHistory={updateExpenseHistory}
        convertToMoneyFormat={convertToMoneyFormat}
      />
      <div className="mt-1 p-4 mr-0 w-full h-screen grid auto-rows-min overflow-y-scroll bg-stone-100 ">
        {/* <ul className="grid grid-cols-3 text-center text-stone-400">
          <li className="border border-stone-400">Date</li>
          <li className="border border-stone-400">Transaction</li>
          <li className="border border-stone-400">Debit/Credit</li>
        </ul> */}

        {transactions && renderAllTransactions}
      </div>
    </div>
  );
};

export default Account;
