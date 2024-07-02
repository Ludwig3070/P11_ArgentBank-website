import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { fillProfil, resetLoginState } from "../redux/redux";
import { useNavigate } from "react-router-dom";

function User() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.user);
  const profilState = useSelector((state) => state.profil);
  const [loading, setLoading] = useState(true);

  const UserProfile = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/v1/user/profile/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${loginState.token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }
      return await response.json();
    } catch (error) {
      console.log("Problème: ", error);
      alert(error.message + "\nTry Again Later");
      /* dispatch(resetLoginState()); */
      navigate("/");
    }
  };

  const fetchProfile = async () => {
    if (loginState.token) {
      try {
        const data = await UserProfile();
        if (data?.body) {
          const { email, firstName, lastName, userName, createdAt, id } = data.body;
          dispatch(
            fillProfil({ email, firstName, lastName, userName, createdAt, id })
          );
          setLoading(false);
        } else {
          throw new Error("Profile data is invalid");
        }
      } catch (error) {
        setLoading(false);
        alert("Error fetching profile: " + error.message);
        navigate("/");
      }
    } else {
      setLoading(false);
      navigate("/");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [loginState, dispatch, navigate]);

  useEffect(() => {
    
  }, [loginState, dispatch, navigate]);

  // useEffect provisoire pour debug
  useEffect(() => {
    console.log("profilState=", profilState);
    console.log("loginState=", loginState);
  }, [profilState, loginState]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Nav
        text={profilState.firstName ? profilState.firstName : "Hello"}
        signOut={true}
      />
      <main className="main bg-dark">
        <div className="header">
          <h1>
            Welcome back
            <br />
            {profilState.firstName || ""} {profilState.lastName || ""}!
          </h1>
          <button className="edit-button">Edit Name</button>
        </div>
        <h2 className="sr-only">Accounts</h2>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default User;
