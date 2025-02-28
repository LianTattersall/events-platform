import { Modal } from "@mui/material";
import { useState } from "react";
import { deleteEvent, getSignupsForEvent } from "../api";
import { useNavigate } from "react-router";
import emailjs from "@emailjs/browser";

export default function DeleteEvent({
  event_id,
  signups,
  event_name,
  organiser_email,
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("confirmation");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  function handleDelete() {
    setModalContent("loading");
    return deleteEvent(event_id)
      .then(() => {
        navigate(`/manageEvents`);
      })
      .catch((err) => {
        setModalContent("error");
      });
  }

  function sendEmailsAndDelete() {
    setModalContent("loading");
    return getSignupsForEvent(event_id)
      .then(({ total }) => {
        return getSignupsForEvent(event_id, "", 1, total);
      })
      .then(({ users }) => {
        return Promise.all(
          users.map(({ email, name }) => sendEmail(email, name))
        );
      })
      .then(() => {
        return deleteEvent(event_id);
      })
      .then(() => {
        navigate(`/manageEvents`);
      })
      .catch((err) => {
        setModalContent("error");
      });
  }

  function sendEmail(emailAddress, name) {
    const emailParams = {
      subject: "event cancellation",
      message: `The event ${event_name} has been cancelled. ${
        email !== "" ? `\n\n${email}` : ""
      } \n\nPlease contact ${organiser_email} if you have any questions.`,
      to_email: emailAddress,
      to_name: name,
    };
    return emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      emailParams,
      import.meta.env.VITE_EMAILJS_KEY
    );
  }

  const confirmation = (
    <div>
      <p>
        {`Are you sure you want to cancel this event? ${
          signups !== 0 ? "Attendees will be notified via email" : ""
        }`}
      </p>
      <button
        className="buttons"
        onClick={() => {
          if (signups !== 0) {
            setModalContent("message");
          } else {
            handleDelete();
          }
        }}
      >
        Yes, cancel this event
      </button>
      <button
        className="buttons"
        onClick={() => {
          setModalOpen(false);
        }}
      >
        No
      </button>
    </div>
  );

  const message = (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <p>
        Add a reason for the cancellation. This will be emailed to the
        attendees.
      </p>
      <textarea
        name=""
        style={{ height: "100%" }}
        className="textarea"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        value={email}
      ></textarea>
      <div>
        <button
          className="buttons"
          style={{ width: "fit-content" }}
          onClick={sendEmailsAndDelete}
        >
          Send
        </button>
        <button
          className="buttons"
          style={{ width: "fit-content" }}
          onClick={sendEmailsAndDelete}
        >
          Skip
        </button>
      </div>
    </div>
  );
  return (
    <>
      <button
        className="buttons"
        onClick={() => {
          setModalOpen(true);
        }}
      >
        Cancel Event
      </button>
      <Modal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setModalContent("confirmation");
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: 400,
            height: 200,
            borderRadius: "10px",
            backgroundColor: "white",
            padding: "10px",
          }}
        >
          {modalContent === "confirmation" ? confirmation : null}
          {modalContent === "message" ? message : null}
          {modalContent === "loading" ? <p>Deleting event...</p> : null}
          {modalContent === "error" ? (
            <p className="error">An error has occured deleting this event</p>
          ) : null}
        </div>
      </Modal>
    </>
  );
}
