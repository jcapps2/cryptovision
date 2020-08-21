import React from "react";
import _ from "lodash";

const cc = require("cryptocompare");
// Free API key
cc.setApiKey(
  "681dd8ade3b9a83e704cdf41e6da9cb05f2e0919883517cabe39ad0e7aac588a"
);

const MAX_FAVORITES = 10;

// Creating context
export const AppContext = React.createContext();

// Provider - refer to https://reactjs.org/docs/context.html
export class AppProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "dashboard",
      favorites: ["BTC", "ETH", "XRP", "LINK"],
      ...this.savedSettings(),
      setPage: this.setPage,
      addCoin: this.addCoin,
      removeCoin: this.removeCoin,
      isInFavorites: this.isInFavorites,
      confirmFavorites: this.confirmFavorites,
      setFilteredCoins: this.setFilteredCoins
    };
  }

  // Start fetching crypto data as soon
  // as page loads.
  componentDidMount = () => {
    this.fetchCoins();
  };

  // Add a coin to favorites
  addCoin = key => {
    let favorites = [...this.state.favorites];
    if (favorites.length < MAX_FAVORITES) {
      favorites.push(key);
      this.setState({ favorites });
    }
  };

  // Remove a coin from favorites
  removeCoin = key => {
    let favorites = [...this.state.favorites];
    this.setState({ favorites: _.pull(favorites, key) }); // pull this value from the array, and then return a new array
  };

  // Ensure that we can't add the same coin to favorites if it's already there
  isInFavorites = key => _.includes(this.state.favorites, key);

  fetchCoins = async () => {
    let coinList = (await cc.coinList()).Data; // only want the coin data here
    this.setState({ coinList });
  };

  // Adds selected favorites into state
  confirmFavorites = () => {
    this.setState({
      firstVisit: false,
      page: "dashboard"
    });
    localStorage.setItem(
      "cryptoVision",
      JSON.stringify({
        favorites: this.state.favorites
      })
    );
  };

  savedSettings() {
    let cryptoVisionData = JSON.parse(localStorage.getItem("cryptoVision"));
    if (!cryptoVisionData) {
      return { page: "settings", firstVisit: true };
    }
    // If we have local data, pull the favorites in and return them
    let { favorites } = cryptoVisionData;
    return { favorites };
  }

  // Sets the current page using state
  setPage = page => this.setState({ page });

  // Filtering coins for Search
  setFilteredCoins = filteredCoins => this.setState({ filteredCoins });

  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
