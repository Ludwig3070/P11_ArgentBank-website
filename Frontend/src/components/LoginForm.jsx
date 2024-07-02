import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useLogin from "../hooks/UseLogin.js";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);  
  const { loading, login } = useLogin(username, password); // Utilisation du hook personnalisé
  const navigate = useNavigate();
  const loginState = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login();

    if (rememberMe) {
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
      localStorage.setItem("rememberMe", true);
    } else {
      localStorage.removeItem("username");
      localStorage.removeItem("password");
      localStorage.setItem("rememberMe", false);
    }
  };

  useEffect(() => {
    // Charger les informations de connexion depuis le localStorage au chargement de la page
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");
    const storedRememberMe = localStorage.getItem("rememberMe") === "true";

    if (storedRememberMe) {
      setUsername(storedUsername || "");
      setPassword(storedPassword || "");
      setRememberMe(storedRememberMe);
    }
  }, []);

  useEffect(() => {
    console.log("Login state:", loginState); 
    // Naviguer vers la page utilisateur si autorisé
    if (loginState.authorized) {
      navigate("/User");
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
        <input
          type="checkbox"
          id="remember-me"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
        />
        <label htmlFor="remember-me">Remember me</label>
      </div>
      <button type="submit" className="sign-in-button">
        {loading ? "Loading..." : "Sign In"}
      </button>
    </form>
  );
}

export default LoginForm;
