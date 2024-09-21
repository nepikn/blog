import { useContext } from "react";
import Auth from "../contexts/auth";

export default function Private({ children }) {
  const auth = useContext(Auth);
  if (!auth) {
    throw new Error("401");
  }

  return <>{children}</>;
}
