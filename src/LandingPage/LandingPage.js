import React from "react";
import "../index.css"
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Dialog from "@material-ui/core/Dialog";
import "@reach/combobox/styles.css";


export default function StoreApp() {

  return <div>
    <div id = "container">
      <img class = 'lp-logo' src="refood_transparent.png" alt="Refood Logo" />
      <Link to = "/view-events">
        <button className = 'landing-button'>Sign up for Events</button>
      </Link>
      <Link to = "/store-view">
        <button className = 'landing-button'>Log in as Grocery Store</button>
      </Link>
    </div>
  </div>
}

