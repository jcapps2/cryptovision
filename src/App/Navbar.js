import React from "react";
import styled, { css } from "styled-components";
import { AppContext } from "./AppProvider";

const Logo = styled.div`
  font-size: 1.5em;
`;

const Nav = styled.div`
  display: grid;
  grid-template-columns: 180px auto 100px 100px;
  margin-bottom: 40px;
`;

const ControlButtonElem = styled.div`
  cursor: pointer;
  ${props =>
    props.active &&
    css`
      color: blue;
    `}
`;

// Set first letter in Navbar to uppercase.
// It's initially lowercase, because it's used
// in the context provider for validation.
const toProperCase = lower => {
  return lower.charAt(0).toUpperCase() + lower.substr(1);
};

// Tabs on Navbar
// Using a consumer for passing context
// in order to change pages.
const ControlButton = ({ name }) => {
  return (
    <AppContext.Consumer>
      {({ page, setPage }) => (
        <ControlButtonElem active={page === name} onClick={() => setPage(name)}>
          {toProperCase(name)}
        </ControlButtonElem>
      )}
    </AppContext.Consumer>
  );
};

export default () => {
  return (
    <Nav>
      <Logo>CryptoVision</Logo>
      <div></div>
      <ControlButton active name="dashboard" />
      <ControlButton name="settings" />
    </Nav>
  );
};
