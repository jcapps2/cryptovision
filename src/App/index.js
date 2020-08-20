import React from "react";
import "./App.css";
import WelcomeMessage from "./WelcomeMessage";
import Layout from "./Layout";
import Nav from "./Nav";

function App() {
  return (
    <Layout>
      <Nav />
      <WelcomeMessage />
    </Layout>
  );
}

export default App;
