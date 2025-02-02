import { useContext, useEffect, useState } from "react";
import "../App.css";
import { MenuDrawerContext } from "../Contexts/MenuDrawContext";
import { Link } from "react-router";

export default function Navbar() {
  const [width, setWidth] = useState(window.innerWidth);
  const { setMenuDrawerOpen, menuDrawerOpen } = useContext(MenuDrawerContext);

  useEffect(() => {
    function moniterWidth() {
      setWidth(window.innerWidth);
    }

    addEventListener("resize", moniterWidth);

    return () => window.removeEventListener("resize", moniterWidth);
  }, []);

  function openCloseDraw() {
    setMenuDrawerOpen((curr) => !curr);
  }

  const notLoggedIn = (
    <>
      <a className="navbar-label">Browse Events</a>
      <div style={{ flex: 1 }}></div>
      <a className="navbar-label">Login</a>
      <Link className="navbar-label" to="/signup">
        Sign up
      </Link>
    </>
  );

  if (width > 500) {
    setMenuDrawerOpen(false);
    return (
      <nav className="navbar">
        <Link className="navbar-label" to="/">
          EventOganiser
        </Link>
        {notLoggedIn}
      </nav>
    );
  } else {
    return (
      <nav className="navbar">
        <Link className="navbar-label" to="/">
          EventOganiser
        </Link>
        <div style={{ flex: 1 }}></div>
        <button className="button-no-display" onClick={openCloseDraw}>
          <p className="navbar-label">{menuDrawerOpen ? "Close" : "Menu"}</p>
        </button>
      </nav>
    );
  }
}
