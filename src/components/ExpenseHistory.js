import { onAuthStateChanged } from "firebase/auth";
import { deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { auth, db } from "../config/firebase_config";
import AccountBalance from "./AccountBalance";
import { useAuthUser } from "./context/AuthUserContextProvider";
import EditExpense from "./EditExpense";
import ExpenseForm from "./ExpenseForm";

const ExpenseHistory = ({
  updateExpenseHistory,
  expenseItem,
  balance,
  setBalance,
  getBalance,
  convertToMoneyFormat,
}) => {
  // const [expenseItem, setExpenseItem] = useState([]);
  const { user } = useAuthUser();
  const navigate = useNavigate();
  const [isForEdit, setIsForEdit] = useState(false);
  const [isForDelete, setIsForDelete] = useState(false);
  const [expenseDoc, setExpenseDoc] = useState();
  const [selectedColor, setSelectedColor] = useState("");
  const [expenseValue, setExpenseValue] = useState({
    description: "",
    amount: "",
    date: "",
  });
  const [expenseId, setExpenseId] = useState();

  useEffect(() => {
    // onAuthStateChanged(auth, (user) => {
    updateExpenseHistory(user);

    // });
  }, [user]);

  const getSelectedExpenseItem = async (item) => {
    setExpenseId(item.id);

    const data = await getDoc(
      doc(db, "users", user.uid, "expense-list", expenseId)
    );
    console.log(expenseId);
    console.log(data.data());
    // return { expenseId: expenseId };
  };

  const handleEditExpense = async () => {
    setExpenseDoc(
      await getDoc(doc(db, "users", user.uid, "expense-list", expenseId))
    );
    //add the amount before edit first
    await setDoc(doc(db, "users", user.uid, "account-balance", "balance-doc"), {
      balance: balance + +expenseDoc.data().amount.replace(/,/g, ""),
    });

    getBalance();
    //update data on expense list item
    await setDoc(doc(db, "users", user.uid, "expense-list", expenseId), {
      description: expenseValue.description,
      amount: +expenseValue.amount.replace(/,/g, ""),
      date: expenseValue.date,
      createdAt: new Date(),
    });

    // //deduct the new input editExpense
    await setDoc(doc(db, "users", user.uid, "account-balance", "balance-doc"), {
      balance: balance - +expenseValue.amount.replace(/,/g, ""),
    });
    getBalance();
    updateExpenseHistory();
    setIsForEdit(false);
    setExpenseValue({
      description: (expenseValue.description = ""),
      amount: (expenseValue.amount = ""),
      date: (expenseValue.date = ""),
    });
  };

  const handleDeleteExpense = async () => {
    const expenseDoc = await getDoc(
      doc(db, "users", user.uid, "expense-list", expenseId)
    );

    await updateDoc(
      doc(db, "users", user.uid, "account-balance", "balance-doc"),
      {
        balance: balance + expenseDoc.data().amount.replace(/,/g, ""),
      }
    );
    await deleteDoc(doc(db, "users", user.uid, "expense-list", expenseId));

    setIsForDelete(false);
    getBalance();
    updateExpenseHistory();
  };
  const expense = expenseItem.map((item) => (
    <div
      key={item.id}
      className="text-black-700 w-full h-fit grid grid-cols-4 text-center bg-white shadow-md p-2 text-[16px]"
    >
      <span>{item.description} </span>
      <span>
        <small>PHP</small> {convertToMoneyFormat(item.amount)}{" "}
      </span>
      <span>{item.date}</span>
      <div id={item.id}>
        <button
          onClick={(e) => {
            e.preventDefault();

            getSelectedExpenseItem(item);
            setIsForEdit(true);
          }}
        >
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
        <button
          onClick={(e) => {
            e.preventDefault();
            getSelectedExpenseItem(item);
            setIsForDelete(true);
          }}
        >
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
      {isForEdit && (
        <form
          className="flex flex-col text-left justify-around items-center text absolute top-64 left-1/2 bg-slate-50 border border-black p-4 w-max rounded"
          onSubmit={(e) => {
            e.preventDefault();
            if (
              expenseValue.description &&
              expenseValue.amount &&
              expenseValue.date
            ) {
              handleEditExpense();
              updateExpenseHistory();
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
            className="input-field w-full"
            type="text"
            name="description"
            value={expenseValue.description}
          />
          <label htmlFor="Amount" className="w-full">
            Amount
          </label>
          <input
            onChange={(e) => {
              // setExpenseValue({ ...expenseValue, amount: e.target.value });

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
            className="input-field py-2 w-full"
            type="text"
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
            className="input-field py-2 self-start"
            type="date"
            name="date"
            value={expenseValue.date}
          />
          <div className="flex justify-around items-center w-[320px] mt-4">
            <button className="btn w-16" type="submit">
              Confirm Edit
            </button>
            <button
              className="w-16 hover:text-red-700 hover:font-bold"
              onClick={(e) => {
                e.preventDefault();
                setIsForEdit(false);
              }}
            >
              <small>x</small> Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  ));

  return (
    <div className="p-2 mr-0 w-full h-full  border grid auto-rows-min">
      <AccountBalance
        balance={balance}
        getBalance={getBalance}
        convertToMoneyFormat={convertToMoneyFormat}
      />
      <ExpenseForm
        updateExpenseHistory={updateExpenseHistory}
        balance={balance}
        setBalance={setBalance}
        getBalance={getBalance}
      />

      <ul className="grid grid-cols-4 text-center text-black  mt-4 mr-5 mb-2 bg-stone-100 p-2 font-bold">
        <li>Description</li>
        <li>Amount</li>
        <li>Date</li>
        <li>Actions</li>
      </ul>
      <div className="overflow-y-scroll h-[80%] grid gap-2 ">{expense}</div>
      {isForDelete && (
        <div className="text-center items-center text absolute top-1/2 left-[45%] bg-slate-50 border border-black p-4 w-max rounded">
          <h1>Are you sure you want to delete this expense item?</h1>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleDeleteExpense();
              console.log("hell");
            }}
            className="inline-flex"
          >
            Yes
          </button>
          <button
            onClick={() => {
              console.log("no");
              setIsForDelete(false);
            }}
            className="inline-flex pl-8"
          >
            No
          </button>
        </div>
      )}
    </div>
  );
};

export default ExpenseHistory;
