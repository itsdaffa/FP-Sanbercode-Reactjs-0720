import React, { useState, createContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = props => {
  const [user, setUser] = useState(false);

  return (
    <AuthContext.Provider value={[user, setUser]}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const AuthConsumer = AuthContext.Consumer;
