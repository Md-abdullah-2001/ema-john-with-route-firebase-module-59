import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/UserContext";
import "./SignIn.css";
const SignIn = () => {
  const { createUser } = useContext(AuthContext);
  const [error, setError] = useState(null);
  //   const [succes, setSuccess] = useState(null);
  const handlebutton = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    const confirm = form.confirm.value;

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        form.reset();
      })
      .catch((error) => console.error(error));
    if (password.length < 6) {
      setError("Password should be at least 6 characters");
      return;
    }

    if (password !== confirm) {
      setError("Password did not match");
      return;
    }

    console.log(email, password, confirm);
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Sign Up</h1>
      <form onSubmit={handlebutton}>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="" required />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="" required />
        </div>
        <div className="form-control">
          <label htmlFor="confirm">Confirm Password</label>
          <input type="password" name="confirm" id="" required />
        </div>
        <input className="btn-submit" type="submit" value="Sign Up" />
      </form>
      {error ? <p className="show-error">{error}</p> : <p>success</p>}
      <p>
        Already Have an Account? <Link to="/login">Sign Up</Link>
      </p>
    </div>
  );
};

export default SignIn;
