import { getAuth } from "firebase/auth";
import { setDoc, doc, collection, addDoc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../config/firebase_config";

const Deposit = ({ setBalance, balance }) => {
  const [deposit, setDeposit] = useState("");
  const navigate = useNavigate();

  const storeDeposit = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    console.log(collection(db, "users", user.uid, "deposit"));

    await addDoc(collection(db, "users", user.uid, "deposit"), {
      depositAmount: deposit,
      depositDate: new Date(),
    });
    await updateDoc(
      doc(db, "users", user.uid, "account-balance", "balance-doc"),
      {
        balance: parseInt(balance) + parseInt(deposit),
        updatedAt: new Date(),
      }
    );
    setBalance(parseInt(balance) + parseInt(deposit));
  };
  return (
    <div className="modal-form md:w-1/2 md:h-max absolute top-1/3 before:bg-black-100">
      <h1>Enter amount of your account deposit</h1>
      <label htmlFor="Amount" className="w-full">
        Amount
      </label>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (deposit) {
            storeDeposit();

            console.log(parseInt(balance));
          }
        }}
      >
        <input
          onChange={(e) => {
            setDeposit(e.target.value);
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
          value={deposit}
        />
        <button className="btn" type="submit">
          Deposit
        </button>
        <button
          className="btn w-6"
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          Close
        </button>
      </form>
    </div>
  );
};

export default Deposit;
