import { Link } from "react-router";
import { dateConverter } from "../utils";

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
            className="image-event-card"
            alt={event.image_description}
          />
        </div>
        <p className="bold ">{event.event_name}</p>
        <p className="card-details">{dateConverter(event.event_date)}</p>
        <p className="card-details">
          {event.price > 0 ? `£${event.price}` : "Free"}
        </p>
        <p className="card-details">{event.firstline_address}</p>
      </div>
    </Link>
  );
}
