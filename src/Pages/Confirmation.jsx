import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getEventById } from "../api";
import AddToGoogleCal from "../Components/AddToGoogleCal";
import PageTemplate from "../Components/PageTemplate";

export default function Confirmation() {
  const { event_id } = useParams();

  const [event, setEvent] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getEventById(event_id)
      .then(({ event }) => {
        setLoading(false);
        setEvent(event);
      })
      .catch((err) => {
        if (err.message == "Request failed with status code 404") {
          setError("404 - event not found");
        } else {
          setError(
            "An error occured whilst loading the page content. Please check if you have recieved a confirmation email."
          );
        }

        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <PageTemplate>
        <p className="text-centre">Loading...</p>
      </PageTemplate>
    );
  }

  if (error != "") {
    return (
      <PageTemplate>
        <p className="error text-centre">{error}</p>
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
