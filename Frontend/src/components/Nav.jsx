import logo from "../img/freecompress-argentBankLogo.webp";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  resetLoginState,
  resetProfil,
  resetValidateUserInfos,
} from "../redux/redux";

function Nav({ text, signOut }) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(resetLoginState());
    dispatch(resetProfil());
    dispatch(resetValidateUserInfos());
  };

  const handleUser = () => {
    console.log("YES");
  };

  return (
    <nav className="main-nav">
      <Link to="/" className="main-nav-logo">
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div className="div-in-nav">
        <Link to="/SignIn" className="main-nav-item">
          <i className="fa fa-user-circle"></i> {text ? text : "Sign in"}{" "}
          {text ? handleUser() : null}
        </Link>
        {signOut && (
          <Link to="/" onClick={handleClick}>
            <i className="fa fa-sign-out"></i> Sign Out
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Nav;
