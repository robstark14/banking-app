import AccountBalance from "./AccountBalance";
import ExpenseForm from "./ExpenseForm";
import ExpenseHistory from "./ExpenseHistory";
import Nav from "./Nav";
import { db } from "../config/firebase_config";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  setDoc,
  addDoc,
  query,
  where,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { usersRef } from "../config/firebase_config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Route, Routes, useNavigate } from "react-router-dom";
import Deposit from "./Deposit";

const Dashboard = () => {
  const [expenseItem, setExpenseItem] = useState([]);
  const auth = getAuth();
  // const user = auth.currentUser;
  const getBalance = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        onSnapshot(
          doc(db, "users", user.uid, "account-balance", "balance-doc"),
          (doc) => {
            console.log(doc.data().balance);
            setBalance(doc.data().balance);
          }
        );
      }
    });
  };
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      // const user = auth.currentUser;
      if (user) {
        updateExpenseHistory(user);
        getBalance(user);
        // deductExpenseToBalance();
        // deductExpenseOnAuthStateChange();
      }
    });
  }, [auth]);

  const updateExpenseHistory = async (user) => {
    // const user = auth.currentUser;

    const data = await getDocs(
      collection(db, "users", user.uid, "expense-list")
    );
    setExpenseItem(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  // const deductExpenseToBalance = async (user) => {
  //   //firestore

  //   const data = await getDocs(
  //     collection(db, "users", user.uid, "expense-list")
  //   );
  //   try {
  //     if (data.docs) {
  //       let expenseItems = data.docs.map((doc) => ({
  //         ...doc.data(),
  //         key: doc.id,
  //       }));
  //       console.log(expenseItems);
  //       let amountArray = expenseItems.map((item) => {
  //         return parseInt(item.amount);
  //       });

  //       //UI
  //       setBalance(
  //         (balance) =>
  //           balance - amountArray.reduce((total, item) => total + item)
  //       );
  //       //Firestore
  //       await updateDoc(
  //         doc(db, "users", user.uid, "account-balance", "balance-doc"),
  //         {
  //           balance:
  //             balance - amountArray.reduce((total, item) => total + item),
  //         },
  //         { merge: true }
  //       );
  //     } else return;
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // };

  //update balance in firestore

  // const deductExpenseOnAuthStateChange = () => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       deductExpenseToBalance();
  //       updateExpenseHistory();
  //     }
  //   });
  // };
  const deductExpenseToBalance = async (user) => {
    //firestore
    // const q = query(collection(db, "users",user.uid, "expense-list"), where("capital", "==", true));

    // const data = await getDocs(
    //   collection(db, "users", user.uid, "expense-list")
    // );
    // const expenseDoc = doc(collection(db, "users", user.uid, "expense-list"));
    // const docId = expenseDoc.id;
    console.log("hello");
    // const document = await getDoc(
    //   doc(db, "users", user.uid, "expense-list", docId)
    // );
    // console.log(document);
    // setBalance(parseInt(balance) - parseInt(document.amount));
  };
  return (
    <div className="grid gap-2 grid-cols-[1fr,2fr] grid-rows-[1fr,1fr,3fr] h-5/6 w-11/12 ">
      <h1 className="text-xl font-bold">Mayon Bank{balance}</h1>
      <AccountBalance
        balance={balance}
        // deductExpenseToBalance={deductExpenseToBalance}
        getBalance={getBalance}
        updateExpenseHistory={updateExpenseHistory}
      />
      <Nav />
      <ExpenseHistory
        expenseItem={expenseItem}
        updateExpenseHistory={updateExpenseHistory}
      />
      <div className="modal-form md:w-full border border-black rounded h-full w-full p-4">
        <h1 className="p-2">Add new Expense</h1>
        <ExpenseForm
          // deductExpenseToBalance={deductExpenseToBalance}
          updateExpenseHistory={updateExpenseHistory}
          balance={balance}
          setBalance={setBalance}
        />
        <Routes>
          <Route
            path="/deposit"
            element={<Deposit balance={balance} setBalance={setBalance} />}
          />
          {/* <Route path="*" element={<NoMatch />} /> */}
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
