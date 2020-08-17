import React, { useState, createContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = props => {
  const currentUser = JSON.parse(localStorage.getItem("user"))
  const initiateUser = currentUser ? currentUser : null
  const [user, setUser] = useState(initiateUser);

  return (
    <AuthContext.Provider value={[user, setUser]}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const AuthConsumer = AuthContext.Consumer;
