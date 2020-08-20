import React from "react";

// Creating context
export const AppContext = React.createContext();

// Provider - refer to https://reactjs.org/docs/context.html
export class AppProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "settings",
      setPage: this.setPage // updater function
    };
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
