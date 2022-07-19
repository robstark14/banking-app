import { getAuth } from "firebase/auth";
import {
  setDoc,
  doc,
  collection,
  addDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../config/firebase_config";
import AccountBalance from "./AccountBalance";
import { useAuthUser } from "./context/AuthUserContextProvider";

const Deposit = ({
  balance,
  getBalance,
  updateExpenseHistory,
  convertToMoneyFormat,
}) => {
  const [deposit, setDeposit] = useState("");
  const navigate = useNavigate();
  const { user } = useAuthUser();
  const storeDeposit = async () => {
    try {
      await addDoc(collection(db, "users", user.uid, "transactions"), {
        transaction: "Deposit",
        depositAmount: +deposit.replace(/,/g, ""),
        date: serverTimestamp(),
      });
      await updateDoc(
        doc(db, "users", user.uid, "account-balance", "balance-doc"),
        {
          balance: balance + +deposit.replace(/,/g, ""),
          date: serverTimestamp(),
        }
      );
    } catch (err) {
      console.log(err.message);
    }
    getBalance();
  };
  return (
    <div className="md:w-full md:h-full">
      <AccountBalance
        balance={balance}
        getBalance={getBalance}
        updateExpenseHistory={updateExpenseHistory}
        convertToMoneyFormat={convertToMoneyFormat}
      />

      <form
        className="w-[360px] h-[220px] m-auto bg-stone-100 rounded grid items-center justify-center mt-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (deposit) {
            storeDeposit();
          }
        }}
      >
        <h1 className="mb-4">Enter amount of your account deposit</h1>
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
                setDeposit(formatted);
              } else {
                setDeposit(value);
              }
            } else {
              setDeposit("");
            }
          }}
          className="input-field py-2"
          type="text"
          name="Amount"
          min="0"
          step="1"
          value={deposit}
          placeholder="PHP 0.00"
        />

        <div className="flex justify-around items-center w-[320px]">
          <button className="btn w-16" type="submit">
            Deposit
          </button>
          <button
            className="w-16 hover:text-red-700 hover:font-bold"
            onClick={(e) => {
              e.preventDefault();
              navigate("/dashboard");
            }}
          >
            <small>x</small> Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Deposit;
