import React, { Component } from "react";
import { Link } from "react-router-dom";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";

import "./Navbar.css";

export default class Navbar extends Component {
  render() {
    return (
      <nav className="bar">
        <div className="container">
          <Link to="/" className="logo">
            <img src="../../../public/refood_icon.png" alt="placeholder" />
          </Link>
          <SignedInLinks />
          <SignedOutLinks />
        </div>
      </nav>
    );
  }
}
