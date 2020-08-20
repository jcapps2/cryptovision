import React from "react";
import styled, { css } from "styled-components";

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

// Set first letter in Navbar to uppercase
const toProperCase = lower => {
  return lower.charAt(0).toUpperCase() + lower.substr(1);
};

// Tabs on Navbar
const ControlButton = ({ name, active }) => {
  return (
    <ControlButtonElem active={active}>{toProperCase(name)}</ControlButtonElem>
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
