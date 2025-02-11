import { Modal } from "@mui/material";
import { useState } from "react";
import { patchEvent } from "../api";
import ImagePicker from "./ImagePicker";
import EventField from "./EventField";

export default function EditEventForm({ setEdit, event, setEvent }) {
  const [imageURL, setImageURL] = useState(event.image_URL);
  const [eventNameInput, setEventNameInput] = useState(event.event_name);
  const [descriptionInput, setDescriptionInput] = useState(event.description);
  const [dateInput, setDateInput] = useState(event.event_date);
  const [startInput, setStartInput] = useState(event.start_time);
  const [endInput, setEndInput] = useState(event.end_time);
  const [noLimit, setNoLimit] = useState(false);
  const [priceInput, setPriceInput] = useState(event.price);
  const [signupLimitInput, setSignupLimitInput] = useState(event.signup_limit);
  const [addressInput, setAdrressInput] = useState(event.firstline_address);
  const [postcodeInput, setPostcodeInput] = useState(event.postcode);
  const [modalOpen, setModalOpen] = useState(false);
  const [publishModalOpen, setPublishModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleDiscard(e) {
    e.preventDefault();
    setModalOpen(true);
  }

  function discardChanges() {
    setEdit(false);
  }

  function handlePublish(e) {
    e.preventDefault();
    setPublishModalOpen(true);
  }

  function updateEvent() {
    setLoading(true);
    patchEvent(
      event.event_id,
      imageURL,
      eventNameInput,
      descriptionInput,
      dateInput,
      startInput,
      endInput,
      signupLimitInput,
      priceInput,
      addressInput,
      postcodeInput
    ).then(({ event }) => {
      setLoading(false);
      setEdit(false);
      setEvent(event);
    });
  }

  return (
    <>
      <form>
        <img
          src={imageURL}
          alt={event.image_description}
          style={{ height: "200px" }}
        />
        <ImagePicker event_id={event.event_id} setImageURL={setImageURL} />
        <EventField
          label={"Event Name: "}
          type={"text"}
          id={"event-name"}
          setter={setEventNameInput}
          value={eventNameInput}
        />
        <div>
          <label htmlFor="description">Description: </label>
          <textarea
            id="description"
            style={{ height: "80px", width: "200px" }}
            onChange={(e) => {
              setDescriptionInput(e.target.value);
            }}
            value={descriptionInput}
          />
        </div>
        <EventField
          type={"date"}
          id={"event-date"}
          label={"Event Date: "}
          setter={setDateInput}
          value={dateInput}
        />
        <EventField
          label={"Start Time: "}
          id={"start-time"}
          type={"time"}
          setter={setStartInput}
          value={startInput}
        />
        <EventField
          id={"end-time"}
          label={"End Time: "}
          type={"time"}
          setter={setEndInput}
          value={endInput}
        />
        <div>
          <label htmlFor="signup-limit">Signup Limit: </label>
          <input
            type="number"
            id="signup-limit"
            onChange={(e) => {
              setSignupLimitInput(e.target.value);
            }}
            value={signupLimitInput}
          />
          <label htmlFor="unlimited-signups">No limit</label>
          <input
            type="checkbox"
            onChange={(e) => {
              setNoLimit(e.target.checked);
            }}
            value={noLimit}
          />
        </div>
        <EventField
          type={"number"}
          id={"price"}
          label={"Price: "}
          setter={setPriceInput}
          value={priceInput}
        />
        <EventField
          type={"text"}
          id={"address"}
          label={"Firstline Address: "}
          setter={setAdrressInput}
          value={addressInput}
        />
        <EventField
          type={"text"}
          id={"postcode"}
          label={"Postcode: "}
          setter={setPostcodeInput}
          value={postcodeInput}
        />
        <button onClick={handlePublish}>Publish Changes</button>
        <button onClick={handleDiscard}>Discard Changes</button>
      </form>
      <Modal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
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
            border: "2px solid #000",
            backgroundColor: "white",
          }}
        >
          <p>Are you sure you want to discard these changes?</p>

          <button onClick={discardChanges}>Yes, Discard changes</button>
          <button
            onClick={() => {
              setModalOpen(false);
            }}
          >
            No, keep editing
          </button>
        </div>
      </Modal>
      <Modal
        open={publishModalOpen}
        onClose={() => {
          setPublishModalOpen(false);
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
            border: "2px solid #000",
            backgroundColor: "white",
          }}
        >
          <p>
            Are you sure you want to publish these changes? This action will
            send an email notifying all current attendees.
          </p>
          {loading ? (
            <p>Updating Event</p>
          ) : (
            <>
              <button onClick={updateEvent}>Yes, publish changes</button>
              <button onClick={() => setPublishModalOpen(false)}>
                No, keep editing
              </button>
            </>
          )}
        </div>
      </Modal>
    </>
  );
}
