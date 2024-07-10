import React, { useEffect } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { useSelector, useDispatch } from "react-redux";
import useProfile from "../hooks/UseProfile";
import { validateUserInfos } from "../redux/redux";
import FormInfos from "../components/FormInfos";

function User() {
  const profilState = useSelector((state) => state.profil);
  const { loading, userProfile } = useProfile();
  const dispatch = useDispatch();
  const userInfosButton = useSelector((state) => state.profil.userInfosButton);

  useEffect(() => {
    userProfile();
    // eslint-disable-next-line
  }, []);

  const handleButtonClick = () => {
    dispatch(validateUserInfos());
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {userInfosButton ? (
        <Nav
          text={profilState.firstName ? profilState.firstName : "Hello"}
          signOut={true}
        />
      ) : (
        <Nav
          text={profilState.userName ? profilState.userName : "Hello"}
          signOut={true}
        />
      )}
      <main className="main bg-dark">
        {userInfosButton ? (
          <div className="header">
            <h1>
              Welcome back
              <br />
              {profilState.firstName || ""} {profilState.lastName || ""}!
            </h1>
            <button className="edit-button" onClick={handleButtonClick}>
              Edit Name
            </button>
          </div>
        ) : (
          <div className="header">
            <h1>Edit user Info</h1>
            <FormInfos />
          </div>
        )}

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
