import React from "react";
import StoreApp from "./business/StoreApp";
import LandingPage from "./LandingPage/LandingPage";
import "./index.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import firebase from "firebase";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <StoreApp />
          </Route>
          <Route exact path="/lp">
            <LandingPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

// function App() {
//   return (
//     <Router>
//       <Navbar/>
//     </Router>
//   );
// }

export default App;
