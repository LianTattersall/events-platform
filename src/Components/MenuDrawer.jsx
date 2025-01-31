import { useContext } from "react";
import { MenuDrawerContext } from "../Contexts/MenuDrawContext";

export default function MenuDrawer() {
  const { menuDrawerOpen } = useContext(MenuDrawerContext);

  const notLoggedIn = (
    <>
      <p className="drawer-label">Browse Events</p>
      <p className="drawer-label">Login</p>
      <p className="drawer-label">Sign up</p>
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
