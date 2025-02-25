import { useContext, useState } from "react";
import ImagePicker from "../Components/ImagePicker";
import EventField from "../Components/EventField";
import { postEvent } from "../api";
import { UserContext } from "../Contexts/UserContext";
import { useNavigate } from "react-router";
import PageTemplate from "../Components/PageTemplate";

export default function CreateEvent() {
  const { userId } = useContext(UserContext);
  const [signupLimitInput, setSignupLimitInput] = useState(0);
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    image_URL:
      "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
    image_description: "",
    event_name: "",
    description: "",
    event_date: "",
    start_time: "",
    end_time: "",
    signup_limit: 0,
    price: "0.00",
    firstline_address: "",
    postcode: "",
  });

  function createEvent(e) {
    e.preventDefault();
    setError([]);
    for (const key in formData) {
      if (formData[key] == "") {
        setError((curr) => [...curr, key]);
      }
    }
    for (const key in formData) {
      if (formData[key] == "") {
        return null;
      }
    }
    setLoading(true);
    postEvent({ ...formData, organiser_id: userId })
      .then(({ event }) => {
        navigate(`/events/${event.event_id}`);
      })
      .catch((err) => {
        setLoading(false);
        setError(["api error"]);
      });
  }

  if (loading) {
    return (
      <PageTemplate>
        <p className="text-centre">Creating Event...</p>
      </PageTemplate>
    );
  }

  return (
    <PageTemplate>
      <h1 className="text-centre">Create a new event</h1>
      <form className="max-width-800">
        <div className="centre-flex-container">
          <img
            src={formData.image_URL}
            alt={formData.image_description}
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
          <label
            htmlFor="signup-limit"
            className="bold"
            style={{ paddingLeft: "5px" }}
          >
            Signup Limit:{" "}
          </label>
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
            checked={formData.signup_limit === null}
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
        <div className="centre-flex-container">
          {error[0] == "api error" ? (
            <p className="error">An error has occured creating your event</p>
          ) : null}
          <button onClick={createEvent} className="buttons">
            Create Event
          </button>
        </div>
      </form>
    </PageTemplate>
  );
}
