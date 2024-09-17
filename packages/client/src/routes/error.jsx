import { styled } from "@mui/material";
import { useRouteError } from "react-router-dom";

const StyledError = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  minHeight: "100vh",
});

export default function Error() {
  const error = useRouteError();
  console.error(error);

  return (
    <StyledError>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <q>{error.statusText || error.message}</q>
      </p>
    </StyledError>
  );
}
