import { useContext, useEffect, useState } from "react";
import { getSavedStatus, postSaved, postSavedTicketMaster } from "../api";
import { UserContext } from "../Contexts/UserContext";
import { Link } from "react-router";

export default function SaveButton({ type, event_id }) {
  const { userId } = useContext(UserContext);

  const [alreadySaved, setAlreadySaved] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getSavedStatus(userId, event_id)
      .then(() => {
        setAlreadySaved(true);
      })
      .catch(() => {
        setAlreadySaved(false);
      });
  }, []);

  function handleSave() {
    setAlreadySaved(true);
    postSaved(userId, Number(event_id)).catch((err) => {
      setAlreadySaved(false);
      setError("An error has occured");
    });
  }

  function handleTicketMasterSave() {
    setAlreadySaved(true);
    postSavedTicketMaster(userId, event_id).catch((err) => {
      setAlreadySaved(false);
      setError("An error has occured");
    });
  }

  if (userId == undefined) {
    return null;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (!alreadySaved) {
    return (
      <button
        onClick={type == "ticketMaster" ? handleTicketMasterSave : handleSave}
      >
        Save Event
      </button>
    );
  } else {
    return <p>Saved!</p>;
  }
}
