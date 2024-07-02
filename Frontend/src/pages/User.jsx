// User.jsx
import React, { useEffect } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import useProfile from "../hooks/UseProfile"; 

console.log("///////////",useProfile);
function User() {
  const profilState = useSelector((state) => state.profil);  
  const { loading, userProfile } = useProfile();


  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    userProfile();
  }, []);

  useEffect(() => {
    console.log("profilState=", profilState);
  }, [profilState]);

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
