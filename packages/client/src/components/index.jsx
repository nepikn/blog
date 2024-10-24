import { Typography } from "@mui/material";
import typeOf from "type-detect";
import { useTitle } from "../hooks";

export function Trademark() {
  return <Typography variant="trademark">Mindly</Typography>;
}

export const H1 = ({ children, hidden, ref, ...props }) => {
  useTitle(getTextContent(children));

  return (
    <Typography variant="h1" hidden={hidden} ref={ref} {...props}>
      {children}
    </Typography>
  );
};

function getTextContent(component) {
  const type = typeOf(component);

  switch (type) {
    case "Array": {
      return component
        .map((child) => getTextContent(child))
        .join(" ");
    }
    case "Object": {
      return getTextContent(component.props.children);
    }
    case "undefined": {
      return "";
    }
    case "string": {
      return component;
    }
    default:
      throw new Error(`unhandled type: ${type}`);
  }
}
