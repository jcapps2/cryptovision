import React from "react";
import "./App.css";
import WelcomeMessage from "./WelcomeMessage";
import Layout from "./Layout";
import Navbar from "./Navbar";

function App() {
  return (
    <Layout>
      <Navbar />
      <WelcomeMessage />
    </Layout>
  );
}

export default App;
