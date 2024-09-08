import { useRouteError } from "react-router-dom";
import styled from "styled-components";

const StyledError = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export default function Error() {
  const error = useRouteError();
  console.error(error);

  return (
    <StyledError>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </StyledError>
  );
}
