import { NavLink, useNavigate } from "react-router-dom";
import { Link, Outlet, useLocation } from "react-router-dom";

const Nav = () => {
  // const navigate = useNavigate();
  // const location = useLocation();
  // const navigateDeposit = () => {
  //   navigate("/deposit");
  // };
  let activeStyle = { color: "#991B1B" };

  return (
    <div className="pt-6 w-72 h-screen grid  shadow-xl bg-stone-100">
      <div className="pt-6 w-72 h-1/2 grid items-center text-left justify-items-start pl-6 text-stone-400 font-bold">
        <NavLink
          to="/dashboard/account"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          className="mt-0 text-center hover-nav"
          // state={{ background: location }}
        >
          <svg
            className="w-6 h-6 inline-block icon-word"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            ></path>
          </svg>
          My account
        </NavLink>
        <NavLink
          to="/dashboard/deposit"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          className="mt-0 text-center hover-nav"
          // state={{ background: location }}
        >
          <svg
            className="w-6 h-6 inline-block icon-word"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
            />
          </svg>
          Deposit
        </NavLink>
        <NavLink
          to="/dashboard/withdraw"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          className="mt-0 text-center hover-nav"
        >
          <svg
            className="w-6 h-6 inline-block icon-word"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"
            />
          </svg>
          Withdraw
        </NavLink>
        <NavLink
          to="/dashboard/transfer"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          className="mt-0 text-center hover-nav"
        >
          <svg
            className="w-6 h-6 inline-block icon-word "
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          Transfer
        </NavLink>
        <NavLink
          to="/dashboard/expenseHistory"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          className="mt-0 text-center hover-nav"
        >
          <svg
            className="w-6 h-6 inline-block icon-word "
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z"
            />
          </svg>
          Expenses
        </NavLink>
        <NavLink
          to="/dashboard/accountMaintenance"
          className="mt-0 text-center hover-nav"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          <svg
            className="w-6 h-6 inline-block icon-word"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          Account Maintenance
        </NavLink>
        <Outlet />
      </div>
    </div>
  );
};

export default Nav;
