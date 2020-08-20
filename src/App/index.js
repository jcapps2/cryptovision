import React from "react";
import "./App.css";
import { AppProvider } from "./AppProvider";
import Layout from "./Layout";
import Navbar from "./Navbar";
import Settings from "../Settings";
import Content from "../Shared/Content";

function App() {
  return (
    <Layout>
      <AppProvider>
        <Navbar />
        <Content>
          <Settings />
        </Content>
      </AppProvider>
    </Layout>
  );
}

export default App;
