import logo from "../img/argentBankLogo.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetLoginState, resetProfil,resetValidateUserInsfos } from "../redux/redux";

function Nav({ text, signOut }) {
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.user);
  const profilState = useSelector((state) => state.profil);

  const handleClick = () => {
    dispatch(resetLoginState());
    dispatch(resetProfil());
    dispatch(resetValidateUserInsfos());

  };

  return (
    <nav className="main-nav">
      <Link to="/" className="main-nav-logo" onClick={handleClick}>
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
          <Link to="/" onClick={handleClick}>
            <i className="fa fa-sign-out"></i> Sign Out
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Nav;
