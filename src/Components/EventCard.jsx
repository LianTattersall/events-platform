import { Link } from "react-router";

export default function EventCard({ event }) {
  return (
    <Link
      style={{ all: "initial", cursor: "pointer" }}
      to={`/events/${event.event_id}`}
    >
      <div className="card-container">
        <div>
          <img
            src={event.image_URL}
            style={{ height: "200px", width: "100%", objectFit: "cover" }}
            alt={event.image_description}
          />
        </div>
        <p>{event.event_name}</p>
        <p>Date: {event.event_date}</p>
        <p>{event.price > 0 ? `£${event.price}` : "Free"}</p>
        <p>{event.firstline_address}</p>
      </div>
    </Link>
  );
}
