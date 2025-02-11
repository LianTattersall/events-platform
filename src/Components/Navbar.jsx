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
    if (userId != null && String(admin) == "true") {
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

  function openCloseDraw() {
    setMenuDrawerOpen((curr) => !curr);
  }

  const notLoggedIn = (
    <>
      <Link to="/browseEvents" className="navbar-label">
        Browse Events
      </Link>
      <div style={{ flex: 1 }}></div>
      <Link to="/login" className="navbar-label">
        Login
      </Link>
      <Link to="/signup" className="navbar-label">
        Sign up
      </Link>
    </>
  );

  const loggedInAdmin = (
    <>
      <Link to={`/browseEvents`} className="navbar-label">
        Browse Events
      </Link>
      <Link to={`/signups/${userId}`} className="navbar-label">
        My Signups
      </Link>
      <Link to={`/savedEvents/${userId}`} className="navbar-label">
        Saved Events
      </Link>
      <Link to={`/manageEvents`} className="navbar-label">
        Manage Events
      </Link>
      <Link to={`/createEvent`} className="navbar-label">
        Create Event
      </Link>
      <div style={{ flex: 1 }}></div>
      <LogoutButton />
      <div style={{ width: "15px" }}></div>
    </>
  );

  const loggedIn = (
    <>
      <Link to={`/browseEvents`} className="navbar-label">
        Browse Events
      </Link>
      <Link to={`/signups/${userId}`} className="navbar-label">
        My Signups
      </Link>
      <Link to={`/savedEvents/${userId}`} className="navbar-label">
        Saved Events
      </Link>
      <div style={{ flex: 1 }}></div>
      <LogoutButton />
      <div style={{ width: "15px" }}></div>
    </>
  );

  if (width > 500 && userStatus == null) {
    setMenuDrawerOpen(false);
    return (
      <nav className="navbar">
        <Link className="navbar-label" to="/">
          EventOrganiser
        </Link>
        {notLoggedIn}
      </nav>
    );
  } else if (width > 900 && userStatus == "admin") {
    setMenuDrawerOpen(false);
    return (
      <nav className="navbar">
        <Link className="logo" to="/">
          EventOrganiser
        </Link>
        {loggedInAdmin}
      </nav>
    );
  } else if (width > 600 && userStatus == "non-admin") {
    setMenuDrawerOpen(false);
    return (
      <nav className="navbar">
        <Link className="logo" to="/">
          EventOrganiser
        </Link>
        {loggedIn}
      </nav>
    );
  } else {
    return (
      <nav className="navbar">
        <Link className="logo" to="/">
          EventOrganiser
        </Link>
        <div style={{ flex: 1 }}></div>
        <button className="button-no-display" onClick={openCloseDraw}>
          <p className="navbar-label">{menuDrawerOpen ? "Close" : "Menu"}</p>
        </button>
      </nav>
    );
  }
}
