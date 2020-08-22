import React from "react";
import styled from "styled-components";
import { AppContext } from "../App/AppProvider";

const ConfirmButtonStyled = styled.div`
  background: transparent;
  color: #fff;
  margin-top: 2.5rem;
  margin-bottom: 2.5rem;
  display: inline-block;
  padding: 0.375rem 0.75rem;
  font-weight: 700;
  -webkit-transition: all 0.3s linear;
  transition: all 0.3s linear;
  font-size: 1.5rem;
  border: 2px solid;
  cursor: pointer;
  border-radius: 0.25rem;
  &:hover {
    color: #5fff17;
    border-color: #5fff17;
  }
`;

const CenterDiv = styled.div`
  display: grid;
  justify-content: center;
`;

export default function() {
  return (
    <AppContext.Consumer>
      {({ confirmFavorites }) => (
        <CenterDiv>
          <ConfirmButtonStyled onClick={confirmFavorites}>
            Confirm
          </ConfirmButtonStyled>
        </CenterDiv>
      )}
    </AppContext.Consumer>
  );
}
