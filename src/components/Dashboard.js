import AccountBalance from "./AccountBalance";
import ExpenseForm from "./ExpenseForm";
import ExpenseHistory from "./ExpenseHistory";
import Nav from "./Nav";
import { auth, db } from "../config/firebase_config";
import {
  collection,
  doc,
  query,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { usersRef } from "../config/firebase_config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Route, Routes, useNavigate } from "react-router-dom";
import Deposit from "./Deposit";
import Withdraw from "./Withdraw";
import Header from "./Header";
import Transfer from "./Transfer";
import EditExpense from "./EditExpense";
import { useAuthUser } from "./context/AuthUserContextProvider";
import Account from "./Account";

const Dashboard = ({ setIsAuth }) => {
  const [expenseItem, setExpenseItem] = useState([]);
  const [balance, setBalance] = useState(0);
  const [alert, setAlert] = useState("");
  const [isAlert, setIsAlert] = useState(false);
  const { user } = useAuthUser();
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        updateExpenseHistory();
        getBalance();
      }
    });
  }, [auth]);

  const getBalance = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        onSnapshot(
          doc(db, "users", user.uid, "account-balance", "balance-doc"),
          (doc) => {
            setBalance(doc?.data().balance);
          }
        );
      }
    });
  };
  const convertToMoneyFormat = (num) => {
    if (!num) return;
    let p = num.toFixed(2).split(".");
    return ` ${p[0].split("")[0] === "-" ? "-" : ""}${p[0]
      .split("")
      .reverse()
      .reduce(function (acc, num, i) {
        return num === "-" ? acc : num + (i && !(i % 3) ? "," : "") + acc;
      }, "")}.${p[1]}`;
  };
  const updateExpenseHistory = () => {
    // const user = auth.currentUser;

    const q = query(
      collection(db, "users", user.uid, "expense-list"),
      orderBy("date", "desc")
    );

    onSnapshot(q, (snapshot) =>
      setExpenseItem(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      )
    );
    //
  };

  return (
    <div className="grid gap-2 grid-cols-[1fr,5fr] h-screen 5/6 w-screen mt-32 bg-stone-300 overflow-hidden">
      <Header setIsAuth={setIsAuth} />
      <Nav />

      <div className="w-full shadow-sm rounded h-full p-6">
        <Routes>
          <Route
            path="/account"
            element={
              <Account
                expenseItem={expenseItem}
                updateExpenseHistory={updateExpenseHistory}
                balance={balance}
                setBalance={setBalance}
                getBalance={getBalance}
                convertToMoneyFormat={convertToMoneyFormat}
              />
            }
          />
          <Route
            path="/expenseHistory"
            element={
              <ExpenseHistory
                expenseItem={expenseItem}
                updateExpenseHistory={updateExpenseHistory}
                balance={balance}
                setBalance={setBalance}
                getBalance={getBalance}
                convertToMoneyFormat={convertToMoneyFormat}
              />
            }
          />
          <Route
            path="/deposit"
            element={
              <Deposit
                balance={balance}
                setBalance={setBalance}
                getBalance={getBalance}
                convertToMoneyFormat={convertToMoneyFormat}
                alert={alert}
                setAlert={setAlert}
                isAlert={isAlert}
                setIsAlert={setIsAlert}
              />
            }
          />
          <Route
            path="/withdraw"
            element={
              <Withdraw
                getBalance={getBalance}
                balance={balance}
                setBalance={setBalance}
                convertToMoneyFormat={convertToMoneyFormat}
                alert={alert}
                setAlert={setAlert}
                isAlert={isAlert}
                setIsAlert={setIsAlert}
              />
            }
          />
          <Route
            path="/transfer"
            element={
              <Transfer
                getBalance={getBalance}
                balance={balance}
                setBalance={setBalance}
                convertToMoneyFormat={convertToMoneyFormat}
                alert={alert}
                setAlert={setAlert}
                isAlert={isAlert}
                setIsAlert={setIsAlert}
              />
            }
          />
          {/* <Route path="*" element={<NoMatch />} /> */}
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
