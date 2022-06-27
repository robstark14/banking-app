import { useNavigate } from "react-router-dom";
import { Link, Outlet, useLocation } from "react-router-dom";

const Nav = () => {
  // const navigate = useNavigate();
  // const location = useLocation();
  // const navigateDeposit = () => {
  //   navigate("/deposit");
  // };

  return (
    <div className="modal-form md:w-full md:h-full grid grid-rows-3 items-center  text-center border border-black">
      <Link
        to="/dashboard/deposit"
        className="btn mt-0 text-center "
        // state={{ background: location }}
      >
        Deposit
      </Link>
      <Link to="/" className="btn mt-0 text-center">
        Withdraw
      </Link>
      <Link to="/" className="btn mt-0 text-center">
        Send Money
      </Link>
      <Outlet />
    </div>
  );
};

export default Nav;
