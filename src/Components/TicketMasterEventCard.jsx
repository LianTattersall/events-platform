import { Link } from "react-router";

export default function TicketMasterEventCard({ event }) {
  return (
    <Link
      to={`/externalEvent/${event.id}`}
      style={{
        all: "initial",
        width: "230px",
        height: "200px",
        margin: "20px",
        cursor: "pointer",
      }}
    >
      <div style={{ height: "120px", width: "230px" }}>
        <img
          src={event.images.url}
          alt="a picture related to the event"
          style={{ height: "100%", width: "100%", objectFit: "cover" }}
        />
      </div>
      <p>{event.name}</p>
      <p>Date: {event.dates.start.localDate}</p>
    </Link>
  );
}
