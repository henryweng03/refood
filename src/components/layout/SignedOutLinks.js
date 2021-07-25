import React from "react";
import { NavLink } from "react-router-dom";

export default function SignedOutLinks() {
  return (
    <ul className="right">
      <li>
        <NavLink to="/" className="btn">
          Sign Up
        </NavLink>
      </li>
      <li>
        <NavLink to="/" className="btn">
          Sign In
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
