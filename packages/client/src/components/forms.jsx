import { useEffect } from "react";
import { Form, useNavigation, useSubmit } from "react-router-dom";
import styled from "styled-components";

const Input = styled.input`
  position: relative;
  width: 100%;
  padding-left: 2rem;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' class='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='%23999' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' /%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: 0.625rem 0.75rem;
  background-size: 1rem;
  background-image: ${(props) => props.$searching && "none"};
`;

const Spinner = styled.div`
  width: 1rem;
  height: 1rem;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'%3E%3Cpath stroke='%23000' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M20 4v5h-.582m0 0a8.001 8.001 0 00-15.356 2m15.356-2H15M4 20v-5h.581m0 0a8.003 8.003 0 0015.357-2M4.581 15H9' /%3E%3C/svg%3E");
  animation: spin 1s infinite linear;
  position: absolute;
  left: 0.625rem;
  top: 0.75rem;

  @keyframes spin {
    to {
      rotate: 1turn;
    }
  }
`;

export function Search({ query }) {
  const navigation = useNavigation();
  const submit = useSubmit();

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");

  useEffect(() => {
    document.querySelector("#q").value = query;
  }, [query]);

  return (
    <Form role="search">
      <Input
        id="q"
        aria-label="Search contacts"
        placeholder="Search"
        type="search"
        name="q"
        onChange={(e) =>
          submit(e.currentTarget.form, { replace: query != null })
        }
        $searching={searching}
      />
      <Spinner aria-hidden hidden={!searching} />
    </Form>
  );
}

export function New() {
  return (
    <Form method="post">
      <button type="submit">New</button>
    </Form>
  );
}
