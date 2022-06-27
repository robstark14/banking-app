import { useState, useEffect } from "react";
import { db } from "../config/firebase_config";
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

import { getAuth, onAuthStateChanged } from "firebase/auth";
const ExpenseForm = ({
  updateExpenseHistory,
  deductExpenseToBalance,
  setBalance,
  balance,
}) => {
  const [expenseValue, setExpenseValue] = useState({
    description: "",
    amount: "",
    date: "",
  });

  // const userRef = doc(db, "users", "");
  const auth = getAuth();
  const user = auth.currentUser;
  console.log(user);
  const addExpenseToDatabase = async () => {
    const expenseDoc = doc(collection(db, "users", user.uid, "expense-list"));
    const docId = expenseDoc.id;
    console.log(docId);
    // const document = await getDoc(
    //   doc(db, "users", user.uid, "expense-list", docId)
    // );
    console.log(document);
    await setDoc(doc(db, "users", user.uid, "expense-list", docId), {
      description: expenseValue.description,
      amount: expenseValue.amount,
      date: expenseValue.date,
      createdAt: new Date(),
      // id: doc.data(),
    });
    const docu = await getDoc(expenseDoc);
    console.log(docu.data().amount);
    setBalance(parseInt(balance) - parseInt(docu.data().amount));
    await setDoc(doc(db, "users", user.uid, "account-balance", "balance-doc"), {
      balance: parseInt(balance) - parseInt(docu.data().amount),
    });
  };

  return (
    <form
      className="flex flex-col justify-around items-center text"
      onSubmit={(e) => {
        e.preventDefault();
        if (
          expenseValue.description &&
          expenseValue.amount &&
          expenseValue.date
        ) {
          onAuthStateChanged(auth, (user) => {
            if (user) {
              addExpenseToDatabase(); // add single expense to database
              updateExpenseHistory(user); //updateExpensehistory() -to updateUI of expense history
              deductExpenseToBalance(user); //authbalance - to update deducted balance
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
          setExpenseValue({ ...expenseValue, amount: e.target.value });
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
    </form>
  );
};

export default ExpenseForm;
