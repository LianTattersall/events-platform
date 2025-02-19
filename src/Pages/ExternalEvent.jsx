import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { MenuDrawerContext } from "../Contexts/MenuDrawContext";
import { getTicketMasterById } from "../api";
import AddToGoogleCal from "../Components/AddToGoogleCal";
import SaveButton from "../Components/SaveButton";
import { dateConverter } from "../utils";
import PageTemplate from "../Components/PageTemplate";

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
        if (
          err.response.data.err.message == "Request failed with status code 404"
        ) {
          setError("404 - Page not found");
        }
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <PageTemplate>
        <p>Loading Event Details...</p>
      </PageTemplate>
    );
  }

  if (error) {
    return (
      <PageTemplate>
        <p className="error">{error}</p>
      </PageTemplate>
    );
  }

  return (
    <PageTemplate>
      <h1 className="text-centre">{event.name}</h1>
      <div className="flex-wrap-row">
        <img
          src={event.images.url}
          alt="An image related to the event"
          className="event-image"
        />
        <div className="event-details">
          <p>
            <span className="bold">Date: </span>
            {dateConverter(event.dates.start.localDate)}
          </p>
          <p>
            <span className="bold">Address: </span>
            {`${event._embedded.venues[0].address.line1}, ${event._embedded.venues[0].postalCode}`}
          </p>
          <a href={event.url} target="_blank" className="link-one-line">
            Book Tickets Here
          </a>
          <AddToGoogleCal
            eventName={event.name}
            date={event.dates.start.localDate}
            dateTime={event.dates.start.dateTime}
          />
          <SaveButton type="ticketMaster" event_id={event_id} />
        </div>
      </div>
    </PageTemplate>
  );
}
