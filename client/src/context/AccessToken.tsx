"use client";

import { createContext, PropsWithChildren, useEffect, useState } from "react";

export const TokenContext = createContext({
  token: "",
  setToken: (token: string) => {},
  removeToken: () => {},
});

const tokenKey = "access_token" as const;

export default function TokenContextProvider({ children }: PropsWithChildren) {
  const [token, setTokenState] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedToken = localStorage.getItem(tokenKey) ?? "";
      setTokenState(savedToken);
    }
  }, []);

  const setToken = (token: string) => {
    if (typeof window === "undefined") return;
    localStorage.setItem(tokenKey, token);
    setTokenState(token);
  };
  const removeToken = () => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(tokenKey);
    setTokenState("");
  };

  return (
    <TokenContext.Provider value={{ token, setToken, removeToken }}>
      {children}
    </TokenContext.Provider>
  );
}
