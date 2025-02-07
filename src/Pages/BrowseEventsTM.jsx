import { useContext } from "react";
import { MenuDrawerContext } from "../Contexts/MenuDrawContext";
import TicketMasterEventSearch from "../Components/TicketMasterEventSearch";
import { Link } from "react-router";

export default function BrowseEventsTM() {
  const { menuDrawerOpen, setMenuDrawerOpen } = useContext(MenuDrawerContext);

  return (
    <div
      className={menuDrawerOpen ? "margin-with-drawer" : "margin-no-drawer"}
      onClick={() => {
        setMenuDrawerOpen(false);
      }}
    >
      <Link to={"/browseEvents"}>Community events</Link>
      <p style={{ display: "inline" }}> | </p>
      <Link to={"/browseEventsTM"}>Ticket Master Events</Link>

      <TicketMasterEventSearch />
    </div>
  );
}
