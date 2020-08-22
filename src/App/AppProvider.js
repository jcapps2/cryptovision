import React from "react";
import moment from "moment";
import _ from "lodash";

const cc = require("cryptocompare");
// Free API key
cc.setApiKey(
  "681dd8ade3b9a83e704cdf41e6da9cb05f2e0919883517cabe39ad0e7aac588a"
);

const MAX_FAVORITES = 10;
const TIME_UNITS = 10;

// Creating context
export const AppContext = React.createContext();

// Provider - refer to https://reactjs.org/docs/context.html
export class AppProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "dashboard",
      favorites: ["BTC", "ETH", "XRP", "LINK"],
      timeInterval: "months",
      ...this.savedSettings(),
      setPage: this.setPage,
      addCoin: this.addCoin,
      removeCoin: this.removeCoin,
      isInFavorites: this.isInFavorites,
      confirmFavorites: this.confirmFavorites,
      setCurrentFavorite: this.setCurrentFavorite,
      setFilteredCoins: this.setFilteredCoins,
      changeChartSelect: this.changeChartSelect
    };
  }

  // Start fetching crypto data as soon
  // as page loads.
  componentDidMount = () => {
    this.fetchCoins();
    this.fetchPrices();
    this.fetchHistorical();
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

  // Fetching prices for chosen coins
  fetchPrices = async () => {
    // We don't want to fetch coin data on user's first visit
    if (this.state.firstVisit) return;

    let prices = await this.prices();
    this.setState({ prices });
  };

  // Fetch historical coin data
  fetchHistorical = async () => {
    if (this.state.firstVisit) return;
    let results = await this.historical();
    let historical = [
      {
        name: this.state.currentFavorite,
        data: results.map((item, index) => [
          moment()
            .subtract({ [this.state.timeInterval]: TIME_UNITS - index })
            .valueOf(), // re-derive data
          item.USD
        ])
      }
    ];
    this.setState({ historical });
  };

  prices = async () => {
    let returnData = [];
    for (let i = 0; i < this.state.favorites.length; i++) {
      try {
        let priceData = await cc.priceFull(this.state.favorites[i], "USD");

        returnData.push(priceData);
      } catch (e) {
        console.warn("Fetch price error: ", e);
      }
    }
    return returnData;
  };

  historical = () => {
    let promises = [];
    for (let units = TIME_UNITS; units > 0; units--) {
      promises.push(
        // From cryptocompare API.
        // Getting data month by month
        // based on specified TIME_UNITS
        cc.priceHistorical(
          this.state.currentFavorite,
          ["USD"],
          moment()
            .subtract({ [this.state.timeInterval]: units })
            .toDate()
        )
      );
    }
    return Promise.all(promises);
  };

  // Adds selected favorites into state
  confirmFavorites = () => {
    // Favorite coin is first in state
    let currentFavorite = this.state.favorites[0];
    this.setState(
      {
        firstVisit: false,
        page: "dashboard",
        currentFavorite,
        prices: null,
        historical: null
      },
      () => {
        this.fetchPrices();
        this.fetchHistorical();
      }
    );
    localStorage.setItem(
      "cryptoVision",
      JSON.stringify({
        favorites: this.state.favorites,
        currentFavorite
      })
    );
  };

  // Setting local state for current favorite, then
  // resetting local storage with current value
  // plus new current favorite.
  setCurrentFavorite = sym => {
    this.setState(
      {
        currentFavorite: sym,
        historical: null
      },
      this.fetchHistorical
    );
    localStorage.setItem(
      "cryptoVision",
      JSON.stringify({
        ...JSON.parse(localStorage.getItem("cryptoVision")),
        currentFavorite: sym
      })
    );
  };

  savedSettings() {
    let cryptoVisionData = JSON.parse(localStorage.getItem("cryptoVision"));
    if (!cryptoVisionData) {
      return { page: "settings", firstVisit: true };
    }
    // If we have local data, pull the favorites in and return them
    let { favorites, currentFavorite } = cryptoVisionData;
    return { favorites, currentFavorite };
  }

  // Sets the current page using state
  setPage = page => this.setState({ page });

  // Filtering coins for Search
  setFilteredCoins = filteredCoins => this.setState({ filteredCoins });

  changeChartSelect = value => {
    this.setState(
      { timeInterval: value, historical: null },
      this.fetchHistorical
    );
  };

  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
