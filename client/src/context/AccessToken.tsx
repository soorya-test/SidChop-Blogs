"use client";

import { createContext, PropsWithChildren, useState } from "react";

export const TokenContext = createContext({
  token: "",
  setToken: (token: string) => {},
  removeToken: () => {},
});

const tokenKey = "access_token" as const;

export default function TokenContextProvider({ children }: PropsWithChildren) {
  const [token, setTokenState] = useState(localStorage.getItem(tokenKey) ?? "");

  const setToken = (token: string) => {
    localStorage.setItem(tokenKey, token);
    setTokenState(token);
  };
  const removeToken = () => {
    localStorage.removeItem(tokenKey);
    setTokenState("");
  };

  return (
    <TokenContext.Provider value={{ token, setToken, removeToken }}>
      {children}
    </TokenContext.Provider>
  );
}
