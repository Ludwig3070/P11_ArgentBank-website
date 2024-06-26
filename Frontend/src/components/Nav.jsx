import logo from "../img/argentBankLogo.png";
import { Link } from "react-router-dom";

function Nav({ text, signOut }) {
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
      <div>
        <Link to="/SignIn" className="main-nav-item">
          <i className="fa fa-user-circle"></i> {text ? text : "Sign in"}
        </Link>
        {signOut && (
          <Link to="/">
            <i className="fa fa-sign-out"></i> Sign Out
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Nav;
