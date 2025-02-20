import { Link } from "react-router";
import { dateConverter } from "../utils";
import { Modal } from "@mui/material";
import { useRef, useState } from "react";
import { deleteSignup } from "../api";

export default function SignupList({ signups, setError, setSignups, userId }) {
  const eventToDelete = useRef({});
  const [open, setOpen] = useState(false);

  function handleDeleteClick(event_id, event_name) {
    eventToDelete.current = { event_id, event_name };
    setOpen(true);
  }

  function closeModal() {
    eventToDelete.current = {};
    setOpen(false);
  }

  function deleteEvent() {
    if (eventToDelete) {
      const beforeDelete = JSON.parse(JSON.stringify(signups));
      setSignups((curr) =>
        curr.filter((event) => event.event_id != eventToDelete.current.event_id)
      );
      setOpen(false);
      deleteSignup(userId, eventToDelete.current.event_id).catch(() => {
        setSignups(beforeDelete);
        setError("An error has occured deleting this event.");
      });
    }
  }

  if (signups.length == 0) {
    return (
      <p style={{ height: "200px" }} className="text-centre">
        No signups yet!
      </p>
    );
  }

  return (
    <>
      <div className="flex-wrap-container">
        {signups.map((event, index) => (
          <div className="signup-container" key={index}>
            <Link className="link-style" to={`/events/${event.event_id}`}>
              <div>
                <img
                  src={event.image_URL}
                  className="mysignup-card"
                  alt={event.image_description}
                />
              </div>

              <p className="bold">{event.event_name}</p>
              <p>
                <span className="bold">Date: </span>
                {dateConverter(event.event_date)}
              </p>
              <p>
                <span className="bold">Price: </span>
                {event.price > 0 ? `£${event.price}` : "Free"}
              </p>
            </Link>

            <button
              className="buttons"
              onClick={() => {
                handleDeleteClick(event.event_id, event.event_name);
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <Modal open={open} onClose={closeModal}>
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
          <p>
            Are you sure you want to delete this event (
            {eventToDelete.current.event_name})?
          </p>
          <button onClick={deleteEvent} className="buttons">
            Yes, remove me from the signup list
          </button>
          <button onClick={closeModal} className="buttons">
            No
          </button>
        </div>
      </Modal>
    </>
  );
}
