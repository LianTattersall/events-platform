import { useContext, useEffect, useState } from "react";
import { MenuDrawerContext } from "../Contexts/MenuDrawContext";
import { useParams } from "react-router";
import { getEventById } from "../api";
import AddToGoogleCal from "../Components/AddToGoogleCal";
import SignUpButton from "../Components/SignUpButton";
import SaveButton from "../Components/SaveButton";

export default function EventPage() {
  const { menuDrawerOpen, setMenuDrawerOpen } = useContext(MenuDrawerContext);

  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState({});
  const [error, setError] = useState("");

  const { event_id } = useParams();

  useEffect(() => {
    getEventById(event_id)
      .then(({ event }) => {
        setEvent(event);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status == 404) {
          setError("404 - Page not found");
        }
      });
  }, []);

  if (loading) {
    return (
      <div
        className={menuDrawerOpen ? "margin-with-drawer" : "margin-no-drawer"}
        onClick={() => {
          setMenuDrawerOpen(false);
        }}
      >
        <p>Loading Event details</p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={menuDrawerOpen ? "margin-with-drawer" : "margin-no-drawer"}
        onClick={() => {
          setMenuDrawerOpen(false);
        }}
      >
        <p className="error">{error}</p>
      </div>
    );
  }

  return (
    <div
      className={menuDrawerOpen ? "margin-with-drawer" : "margin-no-drawer"}
      onClick={() => {
        setMenuDrawerOpen(false);
      }}
    >
      <h1>{event.event_name}</h1>
      <img
        src={event.image_URL}
        style={{ width: "100%", maxWidth: "500px" }}
      ></img>
      <p>{event.description}</p>
      <p>Date: {event.event_date}</p>
      <p>Price: {event.price > 0 ? `£${event.price}` : "Free"}</p>
      <p>
        Location: {event.firstline_address} {event.postcode}
      </p>
      <AddToGoogleCal
        eventName={event.event_name}
        date={event.event_date}
        dateTime={event.event_date + "T" + event.start_time + "Z"}
      />
      <SignUpButton event_id={Number(event_id)} />
      <SaveButton event_id={event_id} />
    </div>
  );
}
