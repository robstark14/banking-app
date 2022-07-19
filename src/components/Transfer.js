import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  setDoc,
  doc,
  collection,
  addDoc,
  updateDoc,
  serverTimestamp,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../config/firebase_config";
import AccountBalance from "./AccountBalance";
import { useAuthUser } from "./context/AuthUserContextProvider";
const Transfer = ({
  balance,
  getBalance,
  convertToMoneyFormat,
  alert,
  setAlert,
  isAlert,
  setIsAlert,
}) => {
  const [transfer, setTransfer] = useState("");
  const [recipientOptions, setRecipientOptions] = useState([]);
  const [recipient, setRecipient] = useState("Transfer to 3rd Party");
  const [recipientData, setRecipientData] = useState("");
  const [userData, setUserData] = useState("");
  const navigate = useNavigate();
  const { user } = useAuthUser();

  useEffect(() => {
    const q = query(
      collection(db, "users"),
      where("id", "!=", user?.uid),
      orderBy("id")
    );
    onSnapshot(q, (snapshot) => {
      setRecipientOptions(snapshot?.docs.map((doc) => doc.data()));
    });

    setIsAlert(false);
    setAlert("");
  }, [recipient]);

  const storeTransfer = async () => {
    console.log("hello");
    onSnapshot(doc(db, "users", recipient), (doc) => {
      setRecipientData(doc.data());
    });
    onSnapshot(doc(db, "users", user.uid), (doc) => {
      setUserData(doc.data());
    });
    //user
    await addDoc(collection(db, "users", user.uid, "transactions"), {
      transaction: "Money Transfer",
      transferAmount: +transfer.replace(/,/g, ""),
      toFrom: "to " + recipientData.firstName + " " + recipientData.lastName, //get the name of recipient
      date: serverTimestamp(),
    });
    await updateDoc(
      doc(db, "users", user.uid, "account-balance", "balance-doc"),
      {
        balance: balance - +transfer.replace(/,/g, ""),
        date: serverTimestamp(),
      }
    );

    //recipient

    await addDoc(collection(db, "users", recipient, "transactions"), {
      transaction: "Money Transfer",
      transferAmount: +transfer.replace(/,/g, ""),
      toFrom: "from " + userData.firstName + " " + userData.lastName, //get the name of recipient
      date: serverTimestamp(),
    });
    await updateDoc(
      doc(db, "users", recipient, "account-balance", "balance-doc"),
      {
        balance: balance + +transfer.replace(/,/g, ""),
        date: serverTimestamp(),
      }
    );
    getBalance();
  };

  return (
    <div className="md:w-full md:h-full ">
      <AccountBalance
        balance={balance}
        getBalance={getBalance}
        convertToMoneyFormat={convertToMoneyFormat}
      />

      <form
        className="w-[360px] h-fit m-auto bg-stone-100 rounded grid items-center justify-center mt-4 relative gap-4 p-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (!recipient) return;
          else if (+transfer.replace(/,/g, "") <= balance) {
            storeTransfer();
            setIsAlert(true);
            setAlert(
              `Success! You have transferred PHP ${convertToMoneyFormat(
                +transfer.replace(/,/g, "")
              )} to ${recipientData.lastName}, ${recipientData.firstName}`
            );
            setTransfer("");
          } else {
            setIsAlert(true);
            setAlert("You don't have enough fund to make this transfer");
            console.log(transfer);
          }
        }}
      >
        {isAlert && (
          <h1
            className={
              transfer <= balance && recipient !== null
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
                setTransfer(formatted);
              } else {
                setTransfer(value);
              }
            } else {
              setTransfer("");
            }
            setIsAlert(false);
          }}
          required
          onFocus={() => setIsAlert(false)}
          className="input-field py-2 text-right pr-8"
          type="text"
          name="Amount"
          min="0"
          step="1"
          value={transfer}
          placeholder="PHP 0.00"
        />
        <select
          onChange={(e) => {
            setIsAlert(false);
            return setRecipient(e.target.value);
          }}
          className="input-field py-2"
          name="recipient"
          value={recipient}
        >
          <option value="">Choose 3rd party account to transfer</option>

          {recipientOptions.map((item) => (
            <option key={item.accountNumber} value={item.id}>
              {item.lastName.toUpperCase()}, {item.firstName} (
              {item.accountNumber})
            </option>
          ))}
        </select>
        <div className="flex justify-around items-center">
          <button className="btn w-16" type="submit">
            Transfer
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

export default Transfer;
