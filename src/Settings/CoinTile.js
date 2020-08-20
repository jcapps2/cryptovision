import React from "react";
import { AppContext } from "../App/AppProvider";
import { SelectableTile } from "../Shared/Tile";
import CoinHeaderGrid from "./CoinHeaderGrid";
import CoinImage from "../Shared/CoinImage";

export default function({ coinKey }) {
  return (
    <AppContext.Consumer>
      {({ coinList }) => {
        // Grabbing full coin object (not just index)
        let coin = coinList[coinKey];
        const TileClass = SelectableTile;
        return (
          <TileClass key={coin.Id}>
            <CoinHeaderGrid name={coin.CoinName} symbol={coin.Symbol} />
            <CoinImage coin={coin} />
          </TileClass>
        );
      }}
    </AppContext.Consumer>
  );
}
