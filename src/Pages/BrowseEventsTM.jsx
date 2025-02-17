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
      <h1 className="text-centre">Browse Events</h1>
      <div className="flex-row-centre">
        <Link to={"/browseEvents"} className="margin-20px">
          Community events
        </Link>

        <Link to={"/browseEventsTM"} className="margin-20px">
          Ticket Master Events
        </Link>
      </div>
      <TicketMasterEventSearch />
    </div>
  );
}
