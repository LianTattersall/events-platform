import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getEventById } from "../api";
import AddToGoogleCal from "../Components/AddToGoogleCal";
import PageTemplate from "../Components/PageTemplate";

export default function Confirmation() {
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
      <PageTemplate>
        <p>Loading...</p>
      </PageTemplate>
    );
  }
  return (
    <PageTemplate>
      <div className="flex-start-column">
        <h1>Confirmation</h1>
        <p>
          You have successfully signed up to {event.event_name}. You should have
          a confirmation email.{" "}
        </p>
        <AddToGoogleCal
          eventName={event.event_name}
          date={event.event_date}
          dateTime={event.event_date + "T" + event.start_time + "Z"}
          eventEnd={event.event_date + "T" + event.end_time + "Z"}
        />
      </div>
    </PageTemplate>
  );
}
