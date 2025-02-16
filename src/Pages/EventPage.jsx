import { useContext, useEffect, useState } from "react";
import { MenuDrawerContext } from "../Contexts/MenuDrawContext";
import { useNavigate, useParams } from "react-router";
import { getEventById } from "../api";
import AddToGoogleCal from "../Components/AddToGoogleCal";
import SignUpButton from "../Components/SignUpButton";
import SaveButton from "../Components/SaveButton";
import { dateConverter } from "../utils";

export default function EventPage() {
  const { menuDrawerOpen, setMenuDrawerOpen } = useContext(MenuDrawerContext);

  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState({});
  const [error, setError] = useState("");

  const { event_id } = useParams();
  const navigate = useNavigate();

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
        } else if (err.response.status == 400) {
          setError("400 - Invalid data type for event ID");
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
      <h1 className="text-centre">{event.event_name}</h1>
      <div className="flex-wrap-row">
        <img
          src={event.image_URL}
          className="event-image"
          alt={event.image_description}
        ></img>
        <div className="event-details">
          <p>{event.description}</p>
          <p>
            <span className="bold">Date: </span>
            {dateConverter(event.event_date)}
          </p>
          <p>
            <span className="bold">Start: </span>
            {event.start_time}
          </p>
          <p>
            <span className="bold">End: </span>
            {event.end_time}
          </p>
          <p>
            <span className="bold">Price: </span>
            {event.price > 0 ? `£${event.price}` : "Free"}
          </p>
          <p>
            <span className="bold">Location: </span>
            {event.firstline_address} {event.postcode}
          </p>

          {new Date().getTime() < new Date(event.event_date).getTime() ? (
            <SignUpButton event_id={event.event_id} />
          ) : (
            <p>Event has expired!</p>
          )}
          <SaveButton event_id={event_id} />
        </div>
      </div>
    </div>
  );
}
