import { Link } from "react-router";

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
          src={image_URL}
          alt={image_description || "a picture related to the event"}
          style={{ height: "100%", width: "100%", objectFit: "cover" }}
        />
      </div>
      <p>{event_name}</p>
      <p>Date: {event_date}</p>
    </Link>
  );
}
