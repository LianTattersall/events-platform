import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { MenuDrawerContext } from "../Contexts/MenuDrawContext";
import { getTicketMasterById } from "../api";
import AddToGoogleCal from "../Components/AddToGoogleCal";

export default function ExternalEvent() {
  const { menuDrawerOpen, setMenuDrawerOpen } = useContext(MenuDrawerContext);
  const { event_id } = useParams();

  const [event, setEvent] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getTicketMasterById(event_id)
      .then((data) => {
        setLoading(false);
        setEvent(data);
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
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
        <p>Loading Event Details...</p>
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
        <p>An error has occured</p>
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
      <h1>{event.name}</h1>
      <img
        src={event.images[event.images.length - 1].url}
        alt="An image related to the event"
        style={{ width: "100%", maxWidth: "500px" }}
      />
      <p>{event.dates.start.localDate}</p>
      <p>{`${event._embedded.venues[0].address.line1}, ${event._embedded.venues[0].postalCode}`}</p>
      <a href={event.url} target="_blank">
        Book Tickets Here
      </a>
      <AddToGoogleCal
        eventName={event.name}
        date={event.dates.start.localDate}
        dateTime={event.dates.start.dateTime}
      />
    </div>
  );
}
