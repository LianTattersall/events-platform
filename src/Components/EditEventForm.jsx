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
  const [error, setError] = useState([]);

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
    setError([]);
    for (const key in formData) {
      if (formData[key] == "") {
        setError((curr) => [...curr, key]);
      }
    }
    for (const key in formData) {
      if (formData[key] == "") {
        setPublishModalOpen(false);
        return null;
      }
    }
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
      <form className="margin-auto">
        <div className="centre-flex-container">
          <img
            src={formData.image_URL}
            alt={event.image_description}
            style={{ height: "200px", marginBottom: "20px" }}
          />
        </div>
        <ImagePicker setFormData={setFormData} />
        <EventField
          label={"Image description for screen readers: "}
          id={"image_description"}
          type={"text"}
          setFormData={setFormData}
          value={formData.image_description}
          error={error.indexOf("image_description") != -1}
        />
        <EventField
          label={"Event Name: "}
          type={"text"}
          id={"event_name"}
          setFormData={setFormData}
          value={formData.event_name}
          error={error.indexOf("event_name") != -1}
        />
        <div>
          <label
            htmlFor="description"
            className="bold"
            style={{ paddingLeft: "5px" }}
          >
            Description:
          </label>
          {error.indexOf("description") != -1 ? (
            <p
              className="error"
              style={{ fontSize: "13px", paddingLeft: "5px" }}
            >
              Please enter description
            </p>
          ) : null}
          <div className="textarea-container">
            <textarea
              id="description"
              className={`textarea ${
                error.indexOf("description") == -1 ? "" : "red-border"
              }`}
              onChange={(e) => {
                setFormData({ ...formData, description: e.target.value });
              }}
              value={formData.description}
            />
          </div>
        </div>
        <EventField
          type={"date"}
          id={"event_date"}
          label={"Event Date: "}
          setFormData={setFormData}
          value={formData.event_date}
          error={error.indexOf("event_date") != -1}
        />
        <EventField
          label={"Start Time: "}
          id={"start_time"}
          type={"time"}
          setFormData={setFormData}
          value={formData.start_time}
          error={error.indexOf("start_time") != -1}
        />
        <EventField
          id={"end_time"}
          label={"End Time: "}
          type={"time"}
          setFormData={setFormData}
          value={formData.end_time}
          error={error.indexOf("end_time") != -1}
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
            value={signupLimitInput}
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
          error={error.indexOf("price") != -1}
        />
        <EventField
          type={"text"}
          id={"firstline_address"}
          label={"Firstline Address: "}
          setFormData={setFormData}
          value={formData.firstline_address}
          error={error.indexOf("firstline_address") != -1}
        />
        <EventField
          type={"text"}
          id={"postcode"}
          label={"Postcode: "}
          setFormData={setFormData}
          value={formData.postcode}
          error={error.indexOf("postcode") != -1}
        />
        <button
          onClick={handlePublish}
          className="buttons"
          style={{ marginLeft: "5px" }}
        >
          Publish Changes
        </button>
        <button onClick={handleDiscard} className="buttons">
          Discard Changes
        </button>
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
            borderRadius: "10px",
            backgroundColor: "white",
            padding: "10px",
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
            borderRadius: "10px",
            backgroundColor: "white",
            padding: "10px",
          }}
        >
          <p>Are you sure you want to publish these changes?</p>
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
