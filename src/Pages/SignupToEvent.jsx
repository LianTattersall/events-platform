import { useContext, useEffect, useState } from "react";
import { MenuDrawerContext } from "../Contexts/MenuDrawContext";
import { getEventById, getUser, postSignup } from "../api";
import { useNavigate, useParams } from "react-router";
import { UserContext } from "../Contexts/UserContext";
import emailjs from "@emailjs/browser";
import { dateConverter } from "../utils";
import PageTemplate from "../Components/PageTemplate";

export default function SignupToEvent() {
  const { menuDrawerOpen, setMenuDrawerOpen } = useContext(MenuDrawerContext);
  const { userId, name } = useContext(UserContext);

  const { event_id } = useParams();

  const [event, setEvent] = useState({});
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getEventById(event_id)
      .then(({ event }) => {
        setEvent(event);
        return getUser(userId);
      })
      .then(({ user }) => {
        setEmail(user.email);
        setLoading(false);
      });
  }, []);

  function signUserUp() {
    const emailParams = {
      subject: "Confirmation",
      to_email: email,
      to_name: name,
      message: `This is a confirmation email that you have signed up to ${
        event.event_name
      } on the ${dateConverter(event.event_date)}, ${event.start_time} at ${
        event.firstline_address
      }, ${
        event.postcode
      }. The organiser should be in contact with further details. Please contact ${
        event.organiser_email
      } if you have any questions.`,
    };
    setLoading(true);
    postSignup(userId, event_id)
      .then((data) => {
        return emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          emailParams,
          import.meta.env.VITE_EMAILJS_KEY
        );
      })
      .then(() => {
        navigate(`/confirmation/${event_id}`);
      })
      .catch((err) => {
        setLoading(false);
        if (err.message == "Request failed with status code 403") {
          setError("Already signed up!");
        } else {
          setError("An error has occured");
        }
      });
  }

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

  if (error != "") {
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
        <p>{error}</p>
      </div>
    );
  }

  return (
    <PageTemplate>
      <div className="flex-start-column">
        <h1>Signing up</h1>
        <p style={{ margin: "10px" }}>
          You are signing up to {event.event_name} on the{" "}
          {dateConverter(event.event_date)}, {event.start_time.slice(0, -3)}. By
          clicking below your name ({name}) and email ({email}) will be added to
          the signup list which the organiser can see. They may contact you via
          email about further details and payment.
        </p>
        <button onClick={signUserUp} className="buttons">
          Confirm
        </button>
      </div>
    </PageTemplate>
  );
}
