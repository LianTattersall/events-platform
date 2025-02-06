import { useContext, useEffect, useState } from "react";
import { MenuDrawerContext } from "../Contexts/MenuDrawContext";
import { Link } from "react-router";
import { UserContext } from "../Contexts/UserContext";
import LogoutButton from "./LogoutButton";

export default function MenuDrawer() {
  const { menuDrawerOpen } = useContext(MenuDrawerContext);
  const { userId, admin } = useContext(UserContext);

  const [userStatus, setUserStatus] = useState(null);

  useEffect(() => {
    if (userId != null && String(admin) == "true") {
      setUserStatus("admin");
    } else if (userId != null) {
      setUserStatus("non-admin");
    } else {
      setUserStatus(null);
    }
  }, [userId]);

  const notLoggedIn = (
    <>
      <p className="drawer-label">Browse Events</p>
      <Link className="drawer-label" to="/login">
        Login
      </Link>
      <Link className="drawer-label" to="/signup">
        Sign up
      </Link>
    </>
  );

  const loggedInAdmin = (
    <>
      <a className="drawer-label">Browse Events</a>
      <a className="drawer-label">My Signups</a>
      <a className="drawer-label">Saved Events</a>
      <a className="drawer-label">Manage Events</a>
      <LogoutButton />
    </>
  );

  const loggedIn = (
    <>
      <a className="drawer-label">Browse Events</a>
      <a className="drawer-label">My Signups</a>
      <a className="drawer-label">Saved Events</a>
      <LogoutButton />
    </>
  );
  return (
    <nav
      className={`drawer ${menuDrawerOpen ? "drawer-open" : "drawer-closed"}`}
    >
      {userStatus == "admin" ? loggedInAdmin : null}
      {userStatus == null ? notLoggedIn : null}
      {userStatus == "non-admin" ? loggedIn : null}
    </nav>
  );
}
