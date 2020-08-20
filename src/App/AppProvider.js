import React from "react";

const cc = require("cryptocompare");

// Free API key
cc.setApiKey(
  "681dd8ade3b9a83e704cdf41e6da9cb05f2e0919883517cabe39ad0e7aac588a"
);

// Creating context
export const AppContext = React.createContext();

// Provider - refer to https://reactjs.org/docs/context.html
export class AppProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "dashboard",
      ...this.savedSettings(),
      setPage: this.setPage,
      confirmFavorites: this.confirmFavorites
    };
  }

  // Start fetching crypto data as soon
  // as page loads.
  componentDidMount = () => {
    this.fetchCoins();
  };

  fetchCoins = async () => {
    let coinList = (await cc.coinList()).Data; // only want the coin data here
    this.setState({ coinList });
  };

  confirmFavorites = () => {
    this.setState({
      firstVisit: false,
      page: "dashboard"
    });
    localStorage.setItem(
      "cryptoVision",
      JSON.stringify({
        test: "hello"
      })
    );
  };

  savedSettings() {
    let cryptoVisionData = JSON.parse(localStorage.getItem("cryptoVision"));
    if (!cryptoVisionData) {
      return { page: "settings", firstVisit: true };
    }
    return {};
  }

  // Sets the current page using state
  setPage = page => this.setState({ page });

  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
