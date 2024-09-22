import { useTitle } from "../hooks";

export const H1 = ({ children, hidden }) => {
  useTitle(children);

  return <h1 hidden={hidden}>{children}</h1>;
};
