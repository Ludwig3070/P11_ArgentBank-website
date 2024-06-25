import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loginRequest,
  resetLoginReceivedFromLoginForm,
} from "../redux/redux.js";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Sélectionnez la partie du state qui nous intéresse (par exemple, 'auth' ou 'user')
  const loginState = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      loginRequest({ username, password, loginReceivedFromLoginForm: true })
    );
    setUsername("");
    setPassword("");
  };

  useEffect(() => {
    console.log("Login state:", loginState);
    // Naviguer vers la page d'accueil après le login réussi
    if (loginState.loginReceivedFromLoginForm) {
      navigate("/");
      // Réinitialiser loginReceivedFromLoginForm à false après la navigation permet quitter la page formulaire
      dispatch(resetLoginReceivedFromLoginForm());
    }
  }, [loginState, navigate]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-wrapper">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="input-wrapper">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="input-remember">
        <input type="checkbox" id="remember-me" />
        <label htmlFor="remember-me">Remember me</label>
      </div>
      <button type="submit" className="sign-in-button">
        Sign In
      </button>
    </form>
  );
}

export default LoginForm;
