import { useEffect, useRef, useState } from "react";
import PageTemplate from "../Components/PageTemplate";
import { getEventById, getSignupsForEvent } from "../api";
import { useParams } from "react-router";
import emailjs from "@emailjs/browser";

export default function EmailUpdate() {
  const { event_id } = useParams();
  const attendeesRef = useRef([]);
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState({});
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    getEventById(event_id)
      .then(({ event }) => {
        setEvent(event);
        return getSignupsForEvent(event_id);
      })
      .then(({ total }) => {
        return getSignupsForEvent(event_id, "", 1, total);
      })
      .then(({ users }) => {
        setLoading(false);
        attendeesRef.current = users;
      })
      .catch((err) => {
        setError("An error occured loading the event data");
      });
  }, []);

  function handleSend(e) {
    e.preventDefault();
    if (subject === "" || message === "") {
      setError("Please enter a subject and message");
      return;
    }
    setLoading(true);
    const emailArr = attendeesRef.current.map((user) => {
      return sendEmail(user.email, user.name);
    });
    return Promise.all(emailArr).then(() => {
      setLoading(false);
      setSuccess("Emails sent!");
    });
  }

  function sendEmail(emailAddress, name) {
    const emailParams = {
      subject,
      message: `There is an update about the event ${event.event_name}: \n${message}`,
      to_email: emailAddress,
      to_name: name,
    };
    return emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        emailParams,
        import.meta.env.VITE_EMAILJS_KEY
      )
      .catch((err) => {
        setError("An error occured sending the email.");
      });
  }

  if (loading) {
    return (
      <PageTemplate>
        <p className="text-centre">Loading...</p>
      </PageTemplate>
    );
  }
  return (
    <PageTemplate>
      <h1 className="text-centre">Email Update for {event.event_name}</h1>
      {error != "" ? <p className="error text-centre">{error}</p> : null}
      {success != "" ? <p className="text-centre">{success}</p> : null}

      <form className="email-form">
        <p>
          <span className="bold">To: </span>All Attendees
        </p>
        <label htmlFor="subject" className="bold">
          Subject:{" "}
        </label>
        <input
          className="event-input"
          type="text"
          id="subject"
          value={subject}
          onChange={(e) => {
            setSubject(e.target.value);
          }}
        />
        <label htmlFor="message" className="bold">
          Message:{" "}
        </label>
        <textarea
          className="textarea"
          style={{ height: "400px" }}
          name=""
          id="message"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        ></textarea>
        <button
          onClick={handleSend}
          className="buttons"
          style={{ width: "fit-content" }}
        >
          Send
        </button>
        <p>
          Note: This will send an email from events.tech.returner@gmail.com to
          all attendees and will include your email for people to get in contact
          with if they have any questions.
        </p>
      </form>
    </PageTemplate>
  );
}
