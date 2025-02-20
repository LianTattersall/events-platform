import CommunityEventSearch from "../Components/CommunityEventSearch";
import { Link } from "react-router";
import PageTemplate from "../Components/PageTemplate";

export default function BrowseEvents() {
  return (
    <PageTemplate>
      <h1 className="text-centre">Browse Events</h1>
      <section className="flex-row-centre">
        <Link to={"/browseEvents"} className="margin-20px">
          Community events
        </Link>

        <Link to={"/browseEventsTM"} className="margin-20px">
          Ticket Master Events
        </Link>
      </section>
      <CommunityEventSearch />
      <div style={{ flex: 1 }}></div>
    </PageTemplate>
  );
}
