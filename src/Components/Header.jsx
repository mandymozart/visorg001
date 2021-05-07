import React, { useState } from "react";
import { Navigation } from "./Navigation";
import useWindowDimensions from "./../Hooks/useWindowDimensions";
import "./Header.css";

const Header = () => {
  const [visible, setVisible] = useState(true);
  const { width } = useWindowDimensions();
  return (
    <header className="Header">
      <div className="Header__logo">
        <img src="/logo.svg" alt="Vienna Struggle" />
      </div>
      {(visible || width > 1023) && <Navigation />}
      <a
        href="#THESTRUGGLEISREAL"
        className="Header__toggle"
        onClick={() => setVisible(!visible)}
      >
        <span role="img" aria-labelledby="epics">
          {visible ? "👊" : "👋"}
        </span>
      </a>
    </header>
  );
};

export default Header;
