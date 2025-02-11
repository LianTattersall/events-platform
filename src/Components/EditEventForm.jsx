import { Modal } from "@mui/material";
import { useState } from "react";
import { patchEvent } from "../api";
import ImagePicker from "./ImagePicker";
import EventField from "./EventField";

export default function EditEventForm({ setEdit, event, setEvent }) {
  const [formData, setFormData] = useState(event);

  const [signupLimitInput, setSignupLimitInput] = useState(event.signup_limit);

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
    patchEvent(formData)
      .then(({ event }) => {
        setLoading(false);
        setEdit(false);
        setEvent(event);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <form>
        <img
          src={formData.image_URL}
          alt={event.image_description}
          style={{ height: "200px" }}
        />
        <ImagePicker setFormData={setFormData} />
        <EventField
          label={"Image description for screen readers: "}
          id={"image_description"}
          type={"text"}
          setFormData={setFormData}
          value={formData.image_description}
        />
        <EventField
          label={"Event Name: "}
          type={"text"}
          id={"event_name"}
          setFormData={setFormData}
          value={formData.event_name}
        />
        <div>
          <label htmlFor="description">Description: </label>
          <textarea
            id="description"
            style={{ height: "80px", width: "200px" }}
            onChange={(e) => {
              setFormData({ ...formData, description: e.target.value });
            }}
            value={formData.description}
          />
        </div>
        <EventField
          type={"date"}
          id={"event_date"}
          label={"Event Date: "}
          setFormData={setFormData}
          value={formData.event_date}
        />
        <EventField
          label={"Start Time: "}
          id={"start_time"}
          type={"time"}
          setFormData={setFormData}
          value={formData.start_time}
        />
        <EventField
          id={"end_time"}
          label={"End Time: "}
          type={"time"}
          setFormData={setFormData}
          value={formData.end_time}
        />
        <div>
          <label htmlFor="signup-limit">Signup Limit: </label>
          <input
            type="number"
            id="signup_limit"
            onChange={(e) => {
              setSignupLimitInput(e.target.value);
              setFormData({ ...formData, signup_limit: e.target.value });
            }}
            value={formData.signup_limit}
          />
          <label htmlFor="unlimited-signups">No limit</label>
          <input
            type="checkbox"
            onChange={(e) => {
              if (e.target.checked) {
                setFormData({
                  ...formData,
                  signup_limit: null,
                });
              } else {
                setFormData({ ...formData, signup_limit: signupLimitInput });
              }
            }}
            checked={formData.signup_limit == null}
          />
        </div>
        <EventField
          type={"number"}
          id={"price"}
          label={"Price: "}
          setFormData={setFormData}
          value={formData.price}
        />
        <EventField
          type={"text"}
          id={"firstline_address"}
          label={"Firstline Address: "}
          setFormData={setFormData}
          value={formData.firstline_address}
        />
        <EventField
          type={"text"}
          id={"postcode"}
          label={"Postcode: "}
          setFormData={setFormData}
          value={formData.postcode}
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
