import { useContext, useEffect, useState } from "react";
import { MenuDrawerContext } from "../Contexts/MenuDrawContext";
import { useParams } from "react-router";
import { getEventById } from "../api";
import AddToGoogleCal from "../Components/AddToGoogleCal";

export default function Confirmation() {
  const { menuDrawerOpen, setMenuDrawerOpen } = useContext(MenuDrawerContext);
  const { event_id } = useParams();

  const [event, setEvent] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEventById(event_id).then(({ event }) => {
      setLoading(false);
      setEvent(event);
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
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <div
      className={
        menuDrawerOpen
          ? "margin-with-drawer flex-start-column"
          : "margin-no-drawer flex-start-column"
      }
      onClick={() => {
        setMenuDrawerOpen(false);
      }}
    >
      <h1>Confirmation</h1>
      <p>
        You have successfully signed up to {event.event_name}. You should have a
        confirmation email.{" "}
      </p>
      <AddToGoogleCal
        eventName={event.event_name}
        date={event.event_date}
        dateTime={event.event_date + "T" + event.start_time + "Z"}
        eventEnd={event.event_date + "T" + event.end_time + "Z"}
      />
    </div>
  );
}
