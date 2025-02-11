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
      <Link to="/browseEvents" className="drawer-label">
        Browse Events
      </Link>
      <Link to="/login" className="drawer-label">
        Login
      </Link>
      <Link to="/signup" className="drawer-label">
        Sign up
      </Link>
    </>
  );

  const loggedInAdmin = (
    <>
      <Link to="/browseEvents" className="drawer-label">
        Browse Events
      </Link>
      <Link to={`/signups/${userId}`} className="drawer-label">
        My Signups
      </Link>
      <Link to={`/savedEvents/${userId}`} className="drawer-label">
        Saved Events
      </Link>
      <Link to={`/manageEvents`} className="drawer-label">
        Manage Events
      </Link>
      <Link to={`/createEvent`} className="drawer-label">
        Create Event
      </Link>
      <LogoutButton />
    </>
  );

  const loggedIn = (
    <>
      <Link to="/browseEvents" className="drawer-label">
        Browse Events
      </Link>
      <Link to={`/signups/${userId}`} className="drawer-label">
        My Signups
      </Link>
      <Link to={`/savedEvents/${userId}`} className="drawer-label">
        Saved Events
      </Link>
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
