import React from "react";
import { NavLink } from "react-router-dom";

export default function SignedInLinks() {
  return (
    <ul className="right">
      <li>
        <NavLink to="/" className="btn">
          Create Event
        </NavLink>
      </li>
      <li>
        <NavLink to="/" className="btn">
          Sign Out
        </NavLink>
      </li>
      <li>
        <NavLink to="/" className="btn">
          placeholder username
        </NavLink>
      </li>
    </ul>
  );
}
