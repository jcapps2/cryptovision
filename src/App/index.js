import React from "react";
import "./App.css";
import { AppProvider } from "./AppProvider";
import Layout from "./Layout";
import Navbar from "./Navbar";
import Settings from "../Settings";

function App() {
  return (
    <Layout>
      <AppProvider>
        <Navbar />
        <Settings />
      </AppProvider>
    </Layout>
  );
}

export default App;
