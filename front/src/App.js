import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MainHeader from "./components/Navigation/MainHeader";
import MainNavigation from "./components/Navigation/MainNavigation";

function App() {
  return (
    <Router>
      <MainNavigation />
      <Route path="/"></Route>
      {/* <Route path="/"></Route> */}
    </Router>
  );
}

export default App;
