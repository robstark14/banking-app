import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { auth } from "../config/firebase_config";

const ExpenseHistory = ({ updateExpenseHistory, expenseItem }) => {
  // const [expenseItem, setExpenseItem] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      updateExpenseHistory(user);
    });
  }, []);

  const expense = expenseItem.map((item) => (
    <div
      key={item.id}
      className="text-black-700 w-full h-full grid grid-cols-4 text-center items-center "
    >
      <span key={item.date.seconds}>{item.description} </span>
      <span key={item.date.seconds}>{item.amount} </span>
      <span key={item.date.seconds}>
        {new Date(item.date.seconds * 1000).toLocaleString()}
      </span>
      <div>
        <button>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            ></path>
          </svg>
        </button>
        <button>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  ));

  return (
    <div className="rounded-xl row-span-2 p-2 mr-0 md:w-full md:h-full  border border-black grid auto-rows-min overflow-y-scroll">
      <ul className="grid grid-cols-4 text-center bg-rose-700 text-white">
        <li className="border border-black">Description</li>
        <li className="border border-black">Amount</li>
        <li className="border border-black">Date</li>
        <li className="border border-black">Actions</li>
      </ul>
      {expense}
    </div>
  );
};

export default ExpenseHistory;
