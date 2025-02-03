import { useContext, useEffect, useState } from "react";
import "../App.css";
import { MenuDrawerContext } from "../Contexts/MenuDrawContext";
import { Link } from "react-router";
import { UserContext } from "../Contexts/UserContext";
import LogoutButton from "./LogoutButton";

export default function Navbar() {
  const [width, setWidth] = useState(window.innerWidth);
  const [userStatus, setUserStatus] = useState(null);
  const { setMenuDrawerOpen, menuDrawerOpen } = useContext(MenuDrawerContext);
  const { userId, admin } = useContext(UserContext);

  useEffect(() => {
    if (userId != null && admin == "true") {
      setUserStatus("admin");
    } else if (userId != null) {
      setUserStatus("non-admin");
    } else {
      setUserStatus(null);
    }

    function moniterWidth() {
      setWidth(window.innerWidth);
    }

    addEventListener("resize", moniterWidth);

    return () => window.removeEventListener("resize", moniterWidth);
  }, [userId]);
  console.log();
  function openCloseDraw() {
    setMenuDrawerOpen((curr) => !curr);
  }

  const notLoggedIn = (
    <>
      <a className="navbar-label">Browse Events</a>
      <div style={{ flex: 1 }}></div>
      <Link className="navbar-label" to="/login">
        Login
      </Link>
      <Link className="navbar-label" to="/signup">
        Sign up
      </Link>
    </>
  );

  const loggedInAdmin = (
    <>
      <a className="navbar-label">Browse Events</a>
      <a className="navbar-label">My Signups</a>
      <a className="navbar-label">Saved Events</a>
      <a className="navbar-label">Manage Events</a>
      <div style={{ flex: 1 }}></div>
      <LogoutButton />
    </>
  );

  const loggedIn = (
    <>
      <a className="navbar-label">Browse Events</a>
      <a className="navbar-label">My Signups</a>
      <a className="navbar-label">Saved Events</a>
      <div style={{ flex: 1 }}></div>
      <LogoutButton />
    </>
  );

  if (width > 500 && userStatus == null) {
    setMenuDrawerOpen(false);
    return (
      <nav className="navbar">
        <Link className="navbar-label" to="/">
          EventOganiser
        </Link>
        {notLoggedIn}
      </nav>
    );
  } else if (width > 700 && userStatus == "admin") {
    setMenuDrawerOpen(false);
    return (
      <nav className="navbar">
        <Link className="navbar-label" to="/">
          EventOganiser
        </Link>
        {loggedInAdmin}
      </nav>
    );
  } else if (width > 600 && userStatus == "non-admin") {
    setMenuDrawerOpen(false);
    return (
      <nav className="navbar">
        <Link className="navbar-label" to="/">
          EventOganiser
        </Link>
        {loggedIn}
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
