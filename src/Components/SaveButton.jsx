import { useContext, useEffect, useState } from "react";
import {
  deleteSaved,
  getSavedStatus,
  getSavedStatusTicketMaster,
  postSaved,
  postSavedTicketMaster,
  deleteSavedTm,
} from "../api";
import { UserContext } from "../Contexts/UserContext";

export default function SaveButton({ type, event_id }) {
  const { userId } = useContext(UserContext);

  const [alreadySaved, setAlreadySaved] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (type == "ticketMaster") {
      getSavedStatusTicketMaster(userId, event_id)
        .then(() => {
          setAlreadySaved(true);
        })
        .catch(() => {
          setAlreadySaved(false);
        });
    } else {
      getSavedStatus(userId, event_id)
        .then(() => {
          setAlreadySaved(true);
        })
        .catch(() => {
          setAlreadySaved(false);
        });
    }
  }, []);

  function handleSave() {
    setAlreadySaved(true);
    postSaved(userId, Number(event_id))
      .then(() => {
        setError("");
      })
      .catch((err) => {
        setAlreadySaved(false);
        setError("An error has occured");
      });
  }

  function handleTicketMasterSave() {
    setAlreadySaved(true);
    postSavedTicketMaster(userId, event_id)
      .then(() => {
        setError("");
      })
      .catch((err) => {
        setAlreadySaved(false);
        setError("An error has occured");
      });
  }

  function handleUnsave() {
    setAlreadySaved(false);
    deleteSaved(userId, event_id)
      .then(() => {
        setError("");
      })
      .catch((err) => {
        setError("An error occured removing this from your saved events list");
      });
  }

  function handleUnsaveTM() {
    setAlreadySaved(false);
    deleteSavedTm(userId, event_id)
      .then(() => {
        setError("");
      })
      .catch((err) => {
        console.log(err);
        setError("An error occured removing this from your saved events list");
      });
  }

  if (userId == undefined) {
    return null;
  }

  if (!alreadySaved) {
    return (
      <>
        <button
          className="buttons"
          onClick={type == "ticketMaster" ? handleTicketMasterSave : handleSave}
        >
          Save Event
        </button>
        {error ? <p className="error">{error}</p> : null}
      </>
    );
  } else {
    return (
      <>
        <button
          className="buttons"
          onClick={type == "ticketMaster" ? handleUnsaveTM : handleUnsave}
        >
          Unsave
        </button>{" "}
        {error ? <p className="error">{error}</p> : null}
      </>
    );
  }
}
