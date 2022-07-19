import { useState, useEffect } from "react";
import { auth, db } from "../config/firebase_config";
import { usersRef } from "../config/firebase_config";
import {
  collection,
  doc,
  // getDocs,
  addDoc,
  getDoc,
  setDoc,
  //   updateDoc,
  //   deleteDoc,
  //   doc,
} from "firebase/firestore";

import { useAuthUser } from "./context/AuthUserContextProvider";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
const EditExpense = ({
  updateExpenseHistory,
  deductExpenseToBalance,
  setBalance,
  balance,
  handleEditExpense,
  setExpenseValue,
  expenseValue,
}) => {
  // const userRef = doc(db, "users", "");
  const { user } = useAuthUser();
  const navigate = useNavigate();
  //   const addExpenseToDatabase = async () => {
  //     const expenseDoc = doc(collection(db, "users", user.uid, "expense-list"));
  //     const docId = expenseDoc.id;
  //     console.log(docId);

  //     // console.log(document);
  //     await setDoc(doc(db, "users", user.uid, "expense-list", docId), {
  //       description: expenseValue.description,
  //       amount: expenseValue.amount,
  //       date: expenseValue.date,
  //       createdAt: new Date(),
  //     });
  //     //update UI
  //     const docu = await getDoc(expenseDoc);
  //     console.log(docu.data().amount);
  //     setBalance(parseInt(balance) - parseInt(docu.data().amount));
  //     await setDoc(doc(db, "users", user.uid, "account-balance", "balance-doc"), {
  //       balance: parseInt(balance) - parseInt(docu.data().amount),
  //     });
  //   };

  return (
    <form
      className="flex flex-col justify-around items-center text absolute top-64 left-1/2 bg-slate-50 border border-black p-4 w-max rounded"
      onSubmit={(e) => {
        e.preventDefault();
        if (
          expenseValue.description &&
          expenseValue.amount &&
          expenseValue.date
        ) {
          onAuthStateChanged(auth, (user) => {
            if (user) {
              //   addExpenseToDatabase(); // add single expense to database
              updateExpenseHistory(user); //updateExpensehistory() -to updateUI of expense history
              // deductExpenseToBalance(user); //authbalance - to update deducted balance
              handleEditExpense();
            }
          });

          // setExpenseValue({
          //   description: (expenseValue.description = ""),
          //   amount: (expenseValue.amount = ""),
          //   date: (expenseValue.date = ""),
          // });
        } else return;
      }}
    >
      <label htmlFor="description" className="w-full">
        Description
      </label>
      <input
        onChange={(e) => {
          setExpenseValue({ ...expenseValue, description: e.target.value });
        }}
        className="input-field"
        type="text"
        name="description"
        value={expenseValue.description}
      />
      <label htmlFor="Amount" className="w-full">
        Amount
      </label>
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
        onKeyPress={(e) => {
          if (!parseInt(e.key)) {
            e.preventDefault();
          }
        }}
        className="input-field py-2"
        type="number"
        name="Amount"
        min="0"
        step="1"
        value={expenseValue.amount}
      />
      <label htmlFor="date" className="w-full">
        Date
      </label>
      <input
        onChange={(e) => {
          setExpenseValue({ ...expenseValue, date: e.target.value });
        }}
        className="input-field py-2"
        type="date"
        name="date"
        value={expenseValue.date}
      />
      <button className="btn" type="submit">
        Add
      </button>
      <button
        className="btn w-6"
        onClick={(e) => {
          e.preventDefault();
          navigate("/dashboard");
        }}
      >
        Close
      </button>
    </form>
  );
};

export default EditExpense;
