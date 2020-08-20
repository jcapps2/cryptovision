import React from "react";
import "./App.css";
import { AppProvider } from "./AppProvider";
import WelcomeMessage from "./WelcomeMessage";
import Layout from "./Layout";
import Navbar from "./Navbar";

function App() {
  return (
    <Layout>
      <AppProvider>
        <Navbar />
        <WelcomeMessage />
      </AppProvider>
    </Layout>
  );
}

export default App;
