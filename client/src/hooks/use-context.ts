import { TokenContext } from "@/context/AccessToken";
import { useContext } from "react";

export const useToken = () => useContext(TokenContext);
