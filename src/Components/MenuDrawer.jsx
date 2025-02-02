import { useContext } from "react";
import { MenuDrawerContext } from "../Contexts/MenuDrawContext";
import { Link } from "react-router";

export default function MenuDrawer() {
  const { menuDrawerOpen } = useContext(MenuDrawerContext);

  const notLoggedIn = (
    <>
      <p className="drawer-label">Browse Events</p>
      <p className="drawer-label">Login</p>
      <Link className="drawer-label" to="/signup">
        Sign up
      </Link>
    </>
  );
  return (
    <nav
      className={`drawer ${menuDrawerOpen ? "drawer-open" : "drawer-closed"}`}
    >
      {notLoggedIn}
    </nav>
  );
}
