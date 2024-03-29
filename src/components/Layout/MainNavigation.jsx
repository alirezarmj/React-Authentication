import { Link } from "react-router-dom";

import classes from "./MainNavigation.module.css";
import { useContext } from "react";
import { AuthContext } from "../../store/AuthContext";

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  function logoutHandle() {
    authCtx.logout();
  }
  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!authCtx.isLoggedIn && (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}
          {authCtx.isLoggedIn && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}
          {authCtx.isLoggedIn && (
            <li>
              <button onClick={logoutHandle}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
