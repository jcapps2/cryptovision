import React from "react";
import styled from "styled-components";
import { DeletableTile } from "../Shared/Tile";

export const CoinHeaderGridStyled = styled.div`
  display: flex;
  justify-content: center;
`;

export const CoinSymbol = styled.div`
  justify-self: center;
`;

export const DeleteIcon = styled.div`
  justify-self: right;
  display: none;
  ${DeletableTile}:hover & {
    display: block;
    color: red;
  }
`;

export default function({ name, symbol, topSection }) {
  return (
    <CoinHeaderGridStyled>
      <div>{name}</div>
      {topSection ? <DeleteIcon>X</DeleteIcon> : <CoinSymbol></CoinSymbol>}
    </CoinHeaderGridStyled>
  );
}
