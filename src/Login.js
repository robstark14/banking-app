import { useState } from "react";

const Login = () => {
  const [value, setValue] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [validSubmit, setValidSubmit] = useState(false);

  const emailInputChange = (e) => {
    setValue({ ...value, email: e.target.value });
  };
  const passwordInputChange = (e) => {
    setValue({ ...value, password: e.target.value });
  };

  return (
    <div className="modal-form">
      {submitted && validSubmit ? (
        <p className="bg-green-300 py-1 px-2 mb-1">
          Success! Please{" "}
          <a className="text-blue-500" href="/">
            sign in
          </a>{" "}
          continue
        </p>
      ) : null}
      <h1 className="font-sans mb-10 text-xl font-bold ">
        Log in to your Account
      </h1>
      <form
        className="flex flex-col columns-1 items-center"
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
          onChange={emailInputChange}
          className="input-field"
          type="email"
          name="email"
          //   required
          value={value.email}
          placeholder="Email"
        />
        {submitted && !value.email ? (
          <p className="warning-input">Please enter your email</p>
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
          <p className="warning-input">Please enter your password</p>
        ) : null}

        <button className="btn " type="submit">
          Log in
        </button>
        <p className="mt-4 text-sm">
          Don't have account yet?{" "}
          <a className="text-blue-500" href="/">
            Create Account
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
