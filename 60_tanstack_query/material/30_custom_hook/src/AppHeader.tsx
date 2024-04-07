import React from "react";
import { Link } from "react-router-dom";

export default function AppHeader() {
  return (
    <header>
      <Link to="/">
        <h1>React Training Blog</h1>
      </Link>
    </header>
  );
}
