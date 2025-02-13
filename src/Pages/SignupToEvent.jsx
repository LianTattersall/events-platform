import { useContext, useEffect, useState } from "react";
import { MenuDrawerContext } from "../Contexts/MenuDrawContext";
import { getEventById, postSignup } from "../api";
import { useNavigate, useParams } from "react-router";
import { UserContext } from "../Contexts/UserContext";
import emailjs from "@emailjs/browser";

export default function SignupToEvent() {
  const { menuDrawerOpen, setMenuDrawerOpen } = useContext(MenuDrawerContext);
  const { userId, name } = useContext(UserContext);

  const { event_id } = useParams();

  const [event, setEvent] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    getEventById(event_id).then(({ event }) => {
      setEvent(event);
      setLoading(false);
    });
  }, []);

  function signUserUp() {
    const emailParams = {
      to_name: "EventOrganiser",
      message: `This is a confirmation email that you have signed up to ${event.event_name}. The organiser should be in contact with further details. Please contact ${event.organiser_email} if you have any questions.`,
    };
    postSignup(userId, event_id)
      .then((data) => {
        return emailjs.send(
          "service_1koacbe",
          "template_thfmz8b",
          emailParams,
          "6I2IQdNYljWCqPhK5"
        );
      })
      .then(() => {
        navigate(`/confirmation/${event_id}`);
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

  return (
    <div
      className={menuDrawerOpen ? "margin-with-drawer" : "margin-no-drawer"}
      onClick={() => {
        setMenuDrawerOpen(false);
      }}
    >
      <p>
        You are signing up to {event.event_name}. By clicking below your name
        and email will be added to the signup list which the organiser can see.
        They may contact you via email about further details and payment.
      </p>
      <button onClick={signUserUp}>Confirm</button>
    </div>
  );
}
