import { Link } from "react-router";
import { dateConverter } from "../utils";

export default function EventCardSmall({
  event_id,
  image_URL,
  event_name,
  event_date,
  type,
  image_description,
}) {
  return (
    <Link
      to={
        type == "community"
          ? `/events/${event_id}`
          : `/externalEvent/${event_id}`
      }
      className="small-event-card-container"
    >
      <div className="small-event-card-img-container">
        <img
          src={image_URL}
          alt={image_description || "a picture related to the event"}
          className="small-event-card-img"
        />
      </div>
      <p className="bold">{event_name}</p>
      <p>
        <span className="bold">Date: </span>
        {dateConverter(event_date)}
      </p>
    </Link>
  );
}
