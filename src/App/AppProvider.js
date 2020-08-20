import React from "react";

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
