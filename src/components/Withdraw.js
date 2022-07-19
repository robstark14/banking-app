import { getAuth } from "firebase/auth";
import {
  setDoc,
  doc,
  collection,
  addDoc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../config/firebase_config";
import AccountBalance from "./AccountBalance";
import { useAuthUser } from "./context/AuthUserContextProvider";
const Withdraw = ({
  balance,
  getBalance,
  updateExpenseHistory,
  convertToMoneyFormat,
  alert,
  setAlert,
  setIsAlert,
  isAlert,
}) => {
  const [withdraw, setWithdraw] = useState("");
  const navigate = useNavigate();
  const { user } = useAuthUser();
  useEffect(() => {
    setIsAlert(false);
    setAlert("");
  }, []);

  const storeWithdrawal = async () => {
    console.log(collection(db, "users", user.uid, "transactions"));

    await addDoc(collection(db, "users", user.uid, "transactions"), {
      transaction: "Withdrawal",
      withdrawalAmount: +withdraw.replace(/,/g, ""),
      date: serverTimestamp(),
    });
    await updateDoc(
      doc(db, "users", user.uid, "account-balance", "balance-doc"),
      {
        balance: balance - +withdraw.replace(/,/g, ""),
        date: serverTimestamp(),
      }
    );

    getBalance();
  };
  return (
    <div className="md:w-full md:h-full ">
      <AccountBalance
        balance={balance}
        convertToMoneyFormat={convertToMoneyFormat}
        getBalance={getBalance}
        updateExpenseHistory={updateExpenseHistory}
      />

      <form
        className="w-[360px] h-fit m-auto bg-stone-100 rounded grid items-center justify-center mt-4 relative gap-4 p-4"
        onSubmit={(e) => {
          e.preventDefault();
          // if (!withdraw) return;
          if (+withdraw.replace(/,/g, "") <= balance) {
            storeWithdrawal();
            setIsAlert(true);
            setAlert("Success!");
            setWithdraw("");
          } else {
            setIsAlert(true);
            setAlert("You don't have enough fund to make this withdrawal");
            console.log(balance);
            console.log(+withdraw.replace(/,/g, ""));
          }
        }}
      >
        <h1>Enter the amount of your account withdrawal</h1>
        {isAlert && (
          <h1
            className={
              +withdraw.replace(/,/g, "") <= balance
                ? "text-green-800 font-bold"
                : "text-red-800 font-bold"
            }
          >
            {alert}
          </h1>
        )}
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
                setWithdraw(formatted);
              } else {
                setWithdraw(value);
              }
            } else {
              setWithdraw("");
            }
            setIsAlert(false);
          }}
          onFocus={() => setIsAlert(false)}
          className="input-field py-2 px-2"
          type="text"
          name="Amount"
          value={withdraw}
          placeholder="PHP 0.00"
          required
        />
        <div className="flex justify-around items-center">
          <button className="btn w-16" type="submit">
            Withdraw
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

export default Withdraw;
