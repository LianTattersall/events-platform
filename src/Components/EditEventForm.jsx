import { Modal } from "@mui/material";
import { useState } from "react";
import { patchEvent } from "../api";

export default function EditEventForm({ setEdit, event, setEvent }) {
  const [eventNameInput, setEventNameInput] = useState(event.event_name);
  const [descriptionInput, setDescriptionInput] = useState(event.description);
  const [dateInput, setDateInput] = useState(event.event_date);
  const [startInput, setStartInput] = useState(event.start_time);
  const [endInput, setEndInput] = useState(event.end_time);
  const [noLimit, setNoLimit] = useState(false);
  const [priceInput, setPriceInput] = useState(event.price);
  const [signupLimitInput, setSignupLimitInput] = useState(event.signup_limit);
  const [addressInput, setAdrressInput] = useState(event.firstline_address);
  const [poscodeInput, setPostcodeInput] = useState(event.postcode);
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
      eventNameInput,
      descriptionInput,
      dateInput,
      startInput,
      endInput,
      signupLimitInput,
      priceInput,
      addressInput,
      poscodeInput
    ).then(({ event }) => {
      console.log("here");
      setLoading(false);
      setEdit(false);
      setEvent(event);
    });
  }

  return (
    <>
      <form>
        <div>
          <label htmlFor="event-name">Event Name: </label>
          <input
            type="text"
            id="event-name"
            onChange={(e) => {
              setEventNameInput(e.target.value);
            }}
            value={eventNameInput}
          />
        </div>
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
        <div>
          <label htmlFor="date">Event Date: </label>
          <input
            type="date"
            id="date"
            onChange={(e) => {
              setDateInput(e.target.value);
            }}
            value={dateInput}
          />
        </div>
        <div>
          <label htmlFor="start-time">Start Time: </label>
          <input
            type="time"
            id="start-time"
            onChange={(e) => {
              setStartInput(e.target.value);
            }}
            value={startInput}
          />
        </div>
        <div>
          <label htmlFor="end-time">End Time: </label>
          <input
            type="time"
            id="end-time"
            onChange={(e) => {
              setEndInput(e.target.value);
            }}
            value={endInput}
          />
        </div>
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
        <div>
          <label htmlFor="price">Price: </label>
          <input
            type="number"
            id="price"
            onChange={(e) => {
              setPriceInput(e.target.value);
            }}
            value={priceInput}
          />
        </div>
        <div>
          <label htmlFor="firstline-address">firstline address: </label>
          <input
            type="text"
            id="firstline-address"
            onChange={(e) => {
              setAdrressInput(e.target.checked);
            }}
            value={addressInput}
          />
        </div>
        <div>
          <label htmlFor="postcode">postcode: </label>
          <input
            type="text"
            id="poscode"
            onChange={(e) => {
              setPostcodeInput(e.target.checked);
            }}
            value={poscodeInput}
          />
        </div>
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
