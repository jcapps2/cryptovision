import React from "react";
import { AppContext } from "../App/AppProvider";

export default function({ firstVisit }) {
  return (
    <AppContext.Consumer>
      {({ firstVisit }) =>
        firstVisit ? (
          <div>
            Welcome to CryptoVision, choose some of your favorite coins to get
            started!
          </div>
        ) : null
      }
    </AppContext.Consumer>
  );
}
