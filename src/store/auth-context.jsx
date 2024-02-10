/* eslint-disable no-undef */
/* eslint-disable react/prop-types */

import { createContext, useState } from "react";

export const AuthContext = createContext({
  token: "",
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

// function calculateRemainingTime(expirationTime) {
//   const currentTime = new Date().getTime();
//   const adjExpirationTime = new Date(expirationTime).getTime();
//   const remainingDuration = adjExpirationTime - currentTime;
//   return remainingDuration;
// }

function AuthContextProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const userIsLoggedIn = !!token;
  function logoutHandler() {
    setToken(null);
    localStorage.removeItem("token");
  }
  function loginHandler(token) {
    setToken(token);
    localStorage.setItem("token", token);
    // const remainingTime = calculateRemainingTime(expirationTime);
    // setTimeout(logoutHandler, remainingTime);
  }

  const contextValue = {
    token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };
  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
