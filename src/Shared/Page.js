import React from "react";
import { AppContext } from "../App/AppProvider";

// Pulling page from props and checking if it is equal to name.
// Name is passed in at component level (settings, dashboard etc.)
export default function({ name, children }) {
  return (
    <AppContext.Consumer>
      {({ page }) => {
        if (page !== name) {
          return null;
        }
        return <div>{children}</div>;
      }}
    </AppContext.Consumer>
  );
}
