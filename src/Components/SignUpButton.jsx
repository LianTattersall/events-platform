import { useContext, useEffect, useState } from "react";
import { deleteSignup, getSignUpStatus, postSignup } from "../api";
import { UserContext } from "../Contexts/UserContext";
import { Link } from "react-router";
import { Modal } from "@mui/material";

export default function SignUpButton({ event_id, event_name }) {
  const { userId } = useContext(UserContext);

  const [signedUpAlready, setSignedUpAlready] = useState(null);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState({});

  useEffect(() => {
    getSignUpStatus(userId, event_id)
      .then((result) => {
        setSignedUpAlready(true);
      })
      .catch(() => {
        setSignedUpAlready(false);
      });
  }, []);

  function handleSignup() {
    setSignedUpAlready(true);
    postSignup(userId, event_id).catch((err) => {
      setSignedUpAlready(false);
      if (err.message == "Request failed with status code 403") {
        setError("You are already signed up to this event");
      }
      setError("An error has occured");
    });
  }

  function closeModal() {
    setEventToDelete({});
    setOpen(false);
  }

  function deleteEvent() {
    if (eventToDelete) {
      setOpen(false);
      setSignedUpAlready(false);
      deleteSignup(userId, eventToDelete.event_id).catch(() => {
        setError("An error has occured deleting this event.");
        setSignedUpAlready(true);
      });
    }
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (userId == undefined) {
    return (
      <Link to="/login">
        <button>Login to sign up</button>
      </Link>
    );
  }

  if (signedUpAlready == true) {
    return (
      <>
        <button
          onClick={() => {
            setOpen(true);
            setEventToDelete({ event_id, event_name });
          }}
        >
          Delete Signup
        </button>
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
      </>
    );
  } else {
    return <button onClick={handleSignup}>Sign Up</button>;
  }
}
