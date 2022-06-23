import { useState } from "react";

const Signup = () => {
  const [value, setValue] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [validSubmit, setValidSubmit] = useState(false);
  const firstNameInputChange = (e) => {
    setValue({ ...value, firstName: e.target.value });
  };
  const lastNameInputChange = (e) => {
    setValue({ ...value, lastName: e.target.value });
  };
  const emailInputChange = (e) => {
    setValue({ ...value, email: e.target.value });
  };
  const passwordInputChange = (e) => {
    setValue({ ...value, password: e.target.value });
  };
  const confirmPasswordInputChange = (e) => {
    setValue({ ...value, confirmPassword: e.target.value });
  };
  return (
    <div className="modal-form ">
      {submitted && validSubmit ? (
        <p className="bg-green-300 py-1 px-2 mb-1">
          Success! Please{" "}
          <a className="text-blue-500" href="/">
            sign in
          </a>{" "}
          continue
        </p>
      ) : null}
      <h1 className="font-sans mb-6 text-xl font-bold ">Register an Account</h1>
      <form
        className="flex flex-col columns-1"
        onSubmit={(e) => {
          e.preventDefault();
          if (
            value.firstName &&
            value.lastName &&
            value.email &&
            value.password &&
            value.confirmPassword
          ) {
            setValidSubmit(true);
            // setValue({
            //   firstName: (value.firstName = ""),
            //   lastName: (value.lastName = ""),
            //   email: (value.email = ""),
            //   password: (value.password = ""),
            //   confirmPassword: (value.confirmPassword = ""),
            // });
          }
          setSubmitted(true);
        }}
      >
        <input
          onChange={firstNameInputChange}
          className="input-field"
          type="text"
          name="firstName"
          //   required
          value={value.firstName}
          placeholder="First Name"
        />
        {submitted && !value.firstName ? (
          <p className="text-red-500 py-1 px-2 mb-1 text-sm">
            Please enter your first name
          </p>
        ) : null}
        <input
          onChange={lastNameInputChange}
          className="input-field"
          type="text"
          name="lastName"
          //   required
          value={value.lastName}
          placeholder="Last Name"
        />
        {submitted && !value.lastName ? (
          <p className="text-red-500 py-1 px-2 mb-1 text-sm">
            Please enter your last name
          </p>
        ) : null}
        <input
          onChange={emailInputChange}
          className="input-field"
          type="email"
          name="email"
          //   required
          value={value.email}
          placeholder="Email"
        />
        {submitted && !value.email ? (
          <p className="text-red-500 py-1 px-2 mb-1 text-sm">
            Please enter your email
          </p>
        ) : null}
        <input
          onChange={passwordInputChange}
          className="input-field"
          type="password"
          name="password"
          //   required
          value={value.password}
          placeholder="Password"
        />
        {submitted && !value.password ? (
          <p className="text-red-500 py-1 px-2 mb-1 text-sm">
            Please enter your password
          </p>
        ) : null}
        <input
          onChange={confirmPasswordInputChange}
          className="input-field"
          type="password"
          name="confirmPassword"
          //   required
          value={value.confirmPassword}
          placeholder="Confirm Password"
        />
        {submitted && !value.confirmPassword ? (
          <p className="text-red-500 py-1 px-2 mb-1 text-sm">
            Please retype your password
          </p>
        ) : null}
        <button className="btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
