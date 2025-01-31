import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const setIsAuthenticatedHandler = (status) => {
    setIsAuthenticated(status);
    localStorage.setItem("isAuthenticated", status ? "true" : "false");
  };

  const setIsRegisteredHandler = (status) => {
    setIsRegistered(status);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated: setIsAuthenticatedHandler,
        isRegistered,
        setIsRegistered: setIsRegisteredHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
