import { useContext, useEffect, useState } from "react";
import { MenuDrawerContext } from "../Contexts/MenuDrawContext";
import { deleteSignup, getSignups } from "../api";
import Modal from "@mui/material/Modal";
import { Link } from "react-router";
import { UserContext } from "../Contexts/UserContext";

export default function MySignups() {
  const { menuDrawerOpen, setMenuDrawerOpen } = useContext(MenuDrawerContext);
  const { userId } = useContext(UserContext);

  const [signups, setSignups] = useState([]);
  const [open, setOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState({});
  const [error, setError] = useState(false);
  const [p, setP] = useState(1);
  const [maxP, setMaxP] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSignups(userId, p).then(({ signups }) => {
      setLoading(false);
      if (signups.length != 0) {
        setSignups(signups);
      } else if (maxP == null) {
        setMaxP(p - 1);
      }
    });
  }, [p]);

  function handleDeleteClick(event_id, event_name) {
    setEventToDelete({ event_id, event_name });
    setOpen(true);
  }

  function closeModal() {
    setEventToDelete({});
    setOpen(false);
  }

  function deleteEvent() {
    if (eventToDelete) {
      const beforeDelete = JSON.parse(JSON.stringify(signups));
      setSignups((curr) =>
        curr.filter((event) => event.event_id != eventToDelete.event_id)
      );
      setOpen(false);
      deleteSignup(userId, eventToDelete.event_id).catch(() => {
        setSignups(beforeDelete);
        setError(true);
      });
    }
  }

  function goToNext() {
    setP((curr) => curr + 1);
  }

  function goToPrev() {
    if (p >= maxP) {
      setP(maxP - 1);
    } else {
      setP((curr) => Math.max(1, curr - 1));
    }
  }

  if (loading) {
    return (
      <div
        className={menuDrawerOpen ? "margin-with-drawer" : "margin-no-drawer"}
        onClick={() => {
          setMenuDrawerOpen(false);
        }}
      >
        <p>Loading signups...</p>
      </div>
    );
  }

  if (signups.length == 0) {
    return (
      <div
        className={menuDrawerOpen ? "margin-with-drawer" : "margin-no-drawer"}
        onClick={() => {
          setMenuDrawerOpen(false);
        }}
      >
        <p>No signups yet!</p>
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
      <div className="flex-wrap-container">
        {signups.map((event, index) => (
          <div className="signup-container" key={index}>
            <Link
              style={{ all: "initial", cursor: "pointer" }}
              to={`/events/${event.event_id}`}
            >
              <div>
                <img
                  src={event.image_URL}
                  style={{ height: "150px", width: "100%", objectFit: "cover" }}
                  alt={event.image_description}
                />
              </div>
              <p>{event.event_name}</p>
              <p>Date: {event.event_date}</p>
              <p>{event.price > 0 ? `£${event.price}` : "Free"}</p>
              <p>{event.firstline_address}</p>
            </Link>
            <button
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
            width: 400,
            height: 200,
            border: "2px solid #000",
            backgroundColor: "white",
          }}
        >
          <p>
            Are you sure you want to delete this event (
            {eventToDelete.event_name})?
          </p>
          <button onClick={deleteEvent}>
            Yes, remove me from the signup list
          </button>
          <button onClick={closeModal}>No</button>
        </div>
      </Modal>
      <button onClick={goToPrev}>previous</button>
      <button onClick={goToNext}>next</button>
      {error ? (
        <p className="error">An error occured deleting this event</p>
      ) : null}
    </div>
  );
}
