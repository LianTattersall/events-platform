import TicketMasterEventSearch from "../Components/TicketMasterEventSearch";
import { Link } from "react-router";
import PageTemplate from "../Components/PageTemplate";

export default function BrowseEventsTM() {
  return (
    <PageTemplate>
      <h1 className="text-centre">Browse Events</h1>
      <div className="flex-row-centre">
        <Link to={"/browseEvents"} className="margin-20px">
          Community Events
        </Link>

        <Link to={"/browseEventsTM"} className="margin-20px">
          Ticket Master Events
        </Link>
      </div>
      <TicketMasterEventSearch />
    </PageTemplate>
  );
}
