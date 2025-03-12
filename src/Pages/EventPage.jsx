import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getEventById } from "../api";
import SignUpButton from "../Components/SignUpButton";
import SaveButton from "../Components/SaveButton";
import { dateConverter } from "../utils";
import PageTemplate from "../Components/PageTemplate";

export default function EventPage() {
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
        if (err.response) {
          if (err.response.status == 404) {
            setError("404 - Page not found");
          } else if (err.response.status == 400) {
            setError("400 - Invalid data type for event ID");
          }
        } else {
          setError("An error has occured");
        }
      });
  }, []);

  if (loading) {
    return (
      <PageTemplate>
        <p className="text-centre">Loading Event details...</p>
      </PageTemplate>
    );
  }

  if (error) {
    return (
      <PageTemplate>
        <p className="error text-centre">{error}</p>
      </PageTemplate>
    );
  }

  return (
    <PageTemplate>
      <h1 className="text-centre">{event.event_name}</h1>
      <div className="flex-wrap-row">
        <img
          src={event.image_URL}
          className="event-image"
          alt={event.image_description}
        ></img>
        <section className="event-details">
          <p>{event.description}</p>
          <p>
            <span className="bold">Date: </span>
            {dateConverter(event.event_date)}
          </p>
          <p>
            <span className="bold">Start time: </span>
            {event.start_time.slice(0, -3)}
          </p>
          <p>
            <span className="bold">End time: </span>
            {event.end_time.slice(0, -3)}
          </p>
          <p>
            <span className="bold">Price: </span>
            {event.price > 0 ? `£${event.price}` : "Free"}
          </p>
          <p>
            <span className="bold">Location: </span>
            {event.firstline_address} {event.postcode}
          </p>
          <p>
            <span className="bold">Organiser's Name: </span>
            {event.organiser_name}
          </p>
          <p>
            <span className="bold">Organiser's Email: </span>
            {event.organiser_email}
          </p>

          {new Date().getTime() < new Date(event.event_date).getTime() &&
          (event.signup_limit == null || event.signup_limit > event.signups) ? (
            <SignUpButton event_id={event.event_id} />
          ) : (
            <p>Event has expired or reached it's signup limit!</p>
          )}
          <SaveButton event_id={event_id} />
        </section>
      </div>
    </PageTemplate>
  );
}
