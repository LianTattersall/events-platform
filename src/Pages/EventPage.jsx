import { useContext, useEffect, useState } from "react";
import { MenuDrawerContext } from "../Contexts/MenuDrawContext";
import { useParams } from "react-router";
import { getEventById } from "../api";

export default function EventPage() {
  const { menuDrawerOpen } = useContext(MenuDrawerContext);
  const [event, setEvent] = useState({});
  const { event_id } = useParams();

  useEffect(() => {
    getEventById(event_id).then(({ event }) => {
      setEvent(event);
    });
  }, []);

  return (
    <div
      className={menuDrawerOpen ? "margin-with-drawer" : "margin-no-drawer"}
      onClick={() => {
        setMenuDrawerOpen(false);
      }}
    >
      <h1>{event.event_name}</h1>
      <img src={event.image_URL} style={{ height: "400px" }}></img>
      <p>{event.description}</p>
      <p>Date: {event.event_date}</p>
      <p>Price: {event.price > 0 ? `£${event.price}` : "Free"}</p>
      <p>
        Location: {event.firstline_address} {event.postcode}
      </p>
    </div>
  );
}
