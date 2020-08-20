import React from "react";
import styled from "styled-components";

const Nav = styled.div`
  display: grid;
  grid-template-columns: 180px auto 100px 100px;
`;

export default () => {
  return (
    <Nav>
      <div>CryptoVision</div>
      <div></div>
      <div>Dashboard</div>
      <div>Settings</div>
    </Nav>
  );
};
