import React, { useState } from "react";
import "./Login.css";
import bigLogo from "../../assets/Group 19448@2x.png";
import view from "../../assets/view.png";
import view2 from "../../assets/view2.png";
import authService from "./../../services/AuthService";
import { useGlobalContext } from "../../context/GlobalContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [emailInputValue, setEmailInputValue] = useState("");
  const [passwordInputValue, setPasswordInputValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const { onLogin } = useGlobalContext();
  const navigate = useNavigate();

  const handleShowPassword = () => {
    setShowPassword((state) => !state);
  };

  const isButtonValid = emailInputValue.trim() === "";

  const handleSubmit = (e) => {
    e.preventDefault();

    authService
      .login(emailInputValue, passwordInputValue)
      .then((res) => {
        if (!res.success) {
          throw new Error("Incorrect email or password!");
        }
        onLogin(res);
        setError("");
        navigate("/");
      })
      .catch((err) => {
        setError("Incorrect email or password!");
      });
  };

  return (
    <div className="login-wrapper">
      <div className="overlay">
        <div className="login-container">
          <div className="login-heading">
            <img src={bigLogo} alt="logo" />
            <h1>WELCOME BACK</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="login-email-container">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                name="email"
                onChange={(e) => setEmailInputValue(e.target.value)}
                value={emailInputValue}
              />
            </div>
            <div className="login-password-container">
              <label htmlFor="password">Password</label>
              <input
                type={!showPassword ? "password" : "text"}
                id="password"
                name="password"
                onChange={(e) => setPasswordInputValue(e.target.value)}
                value={passwordInputValue}
              />
              {error ? <p style={{ color: "red" }}>{error}</p> : ""}
              <span onClick={handleShowPassword}>
                <img src={!showPassword ? `${view}` : `${view2}`} alt="view" />
              </span>
            </div>
            <div className="button-container">
              <button disabled={isButtonValid}>LOG IN</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
