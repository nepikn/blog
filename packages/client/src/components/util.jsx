import { capitalCase } from "change-case";
import { useNavigate, useNavigation } from "react-router-dom";
import styled, { css } from "styled-components";
import { useTitle } from "../handler/hooks";

export const H1 = ({ children, hidden }) => {
  useTitle(children);

  return <h1 hidden={hidden}>{children}</h1>;
};

const StyledLoading = styled.div`
  ${(props) =>
    props.$loading &&
    css`
      opacity: 0.25;
      transition: opacity 200ms;
      transition-delay: 200ms;
    `}
`;

export const Loading = ({ children }) => {
  const navigation = useNavigation();

  return (
    <StyledLoading $loading={navigation.state == "loading"}>
      {children}
    </StyledLoading>
  );
};

export const BtnCancel = () => {
  const navigate = useNavigate();

  return (
    <button type="button" onClick={() => navigate(-1)}>
      Cancel
    </button>
  );
};
