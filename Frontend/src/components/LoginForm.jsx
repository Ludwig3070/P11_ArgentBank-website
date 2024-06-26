import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loginRequest,
  resetLoginReceivedFromLoginForm,
  loginFailure,
  loginSuccess,
} from "../redux/redux.js";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginState = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Commence le chargement
    dispatch(
      loginRequest({ username, password, loginReceivedFromLoginForm: true })
    );

    try {
      const response = await fetch("http://localhost:3001/api/v1/user/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: username,
          password: password,
        }),
      });

      const data = await response.json();

      if (data.body && data.body.token) {
        dispatch(
          loginSuccess({ token: data.body.token, response: data.message })
        );

        // Stocker les informations de connexion si "Remember me" est coché
        if (rememberMe) {
          localStorage.setItem("username", username);
          localStorage.setItem("password", password);
          localStorage.setItem("rememberMe", rememberMe);
        } else {
          localStorage.removeItem("username");
          localStorage.removeItem("password");
          localStorage.removeItem("rememberMe");
        }
      } else {
        dispatch(
          loginFailure({ error: "Token not found", response: data.message })
        );
        
      }
    } catch (error) {
      dispatch(
        loginFailure({ error: error.message, response: "Login failed" })
      );
      console.error("Login error: ", error);
      alert(error)
    } finally {      
      setLoading(false); //fin du chargement
    }
    
  };

  useEffect(() => {
    /* dispatch(resetLoginState()); */
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
    
    // Naviguer vers la page d'accueil après le login réussi
    if (loginState.authorized) {
      navigate("/User");
      // Réinitialiser loginReceivedFromLoginForm à false après la navigation permet quitter la page formulaire
      dispatch(resetLoginReceivedFromLoginForm());
    } 
     // Afficher une alerte en cas d'erreur de connexion
     if (loginState.error) {
      alert(loginState.message);
    }   
  }, [loginState, navigate, dispatch]);

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
        {/* Affichage conditionnel du chargement */}
        {loading ? "Loading..." : "Sign In"}
      </button>
    </form>
  );
}

export default LoginForm;
