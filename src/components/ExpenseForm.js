import { useState, useEffect } from "react";
import { auth, db } from "../config/firebase_config";
import { usersRef } from "../config/firebase_config";
import {
  collection,
  doc,
  setDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { useAuthUser } from "./context/AuthUserContextProvider";
import { onAuthStateChanged } from "firebase/auth";
const ExpenseForm = ({
  updateExpenseHistory,
  deductExpenseToBalance,
  getBalance,
  balance,
}) => {
  const [expenseValue, setExpenseValue] = useState({
    description: "",
    amount: "",
    date: "",
  });

  const { user } = useAuthUser();
  const addExpenseToDatabase = async () => {
    const expenseDoc = doc(collection(db, "users", user.uid, "expense-list"));
    const docId = expenseDoc.id;

    await setDoc(doc(db, "users", user.uid, "expense-list", docId), {
      description: expenseValue.description,
      amount: +expenseValue.amount.replace(/,/g, ""),
      date: expenseValue.date,
      createdAt: serverTimestamp(),
    });
    //update UI
    console.log(+expenseValue.amount.replace(/,/g, ""));
    console.log(expenseValue.amount);
    await updateDoc(
      doc(db, "users", user.uid, "account-balance", "balance-doc"),
      {
        balance: balance - +expenseValue.amount.replace(/,/g, ""),
        date: serverTimestamp(),
      }
    );
    getBalance();
  };

  return (
    <form
      className="grid grid-cols-2 text shadow-lg p-4 rounded text-right gap-2 bg-stone-100 mt-1"
      onSubmit={(e) => {
        e.preventDefault();
        if (
          expenseValue.description &&
          expenseValue.amount &&
          expenseValue.date
        ) {
          // onAuthStateChanged(auth, (user) => {
          //   if (user) {
          addExpenseToDatabase(); // add single expense to database
          updateExpenseHistory(); //updateExpensehistory() -to updateUI of expense history
          // deductExpenseToBalance(user); //authbalance - to update deducted balance
          // setExpenseValue({
          //   description: (expenseValue.description = ""),
          //   amount: (expenseValue.amount = ""),
          //   date: (expenseValue.date = ""),
          // });
          //   }
          // });
          //
        } else return;
      }}
    >
      <div className="w-fit bg-white flex flext-start items-center rounded-md col-span-2 ">
        <label
          htmlFor="date"
          className="hover:cursor-pointer hover:text-red-800"
        >
          <span className="material-symbols-outlined">calendar_month</span>
        </label>
        <input
          onChange={(e) => {
            setExpenseValue({ ...expenseValue, date: e.target.value });
          }}
          className="w-fit border-none focus:outline-none h-full shadow-none rounded-md focus:ring-0"
          type="date"
          name="date"
          id="date"
          value={expenseValue.date}
          placeholder="Select Date"
        />
      </div>
      <input
        onChange={(e) => {
          setExpenseValue({ ...expenseValue, description: e.target.value });
        }}
        className="input-field w-full"
        type="text"
        name="description"
        value={expenseValue.description}
        placeholder="Description"
      />

      <input
        onChange={(e) => {
          const value = e.target.value;
          const clean = value.replace(/,/g, "");
          const regex = /^[0-9]*\.?[0-9]*$/;

          if (value && clean.match(regex)) {
            if (!value.includes(".")) {
              const formatted = new Intl.NumberFormat().format(
                parseFloat(clean)
              );
              setExpenseValue({ ...expenseValue, amount: formatted });
            } else {
              setExpenseValue({ ...expenseValue, amount: value });
            }
          } else {
            setExpenseValue({ ...expenseValue, amount: "" });
          }
        }}
        className="input-field py-2 border-none w-full"
        type="text"
        name="Amount"
        value={expenseValue.amount}
        placeholder="Amount"
      />

      <button
        className="bg-rose-700 col-span-2 w-[200px] m-auto text-white text-sm p-1 rounded"
        type="submit"
      >
        Add
      </button>
    </form>
  );
};

export default ExpenseForm;
