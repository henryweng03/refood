import React from 'react';
import StoreApp from './Store/StoreApp';
import LandingPage from "./LandingPage/LandingPage";
import './index.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path = "/">
            <StoreApp />
          </Route>
          <Route exact path = "/lp">
            <LandingPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;