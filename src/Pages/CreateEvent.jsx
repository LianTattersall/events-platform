import { useContext, useState } from "react";
import { MenuDrawerContext } from "../Contexts/MenuDrawContext";
import ImagePicker from "../Components/ImagePicker";
import EventField from "../Components/EventField";
import { postEvent } from "../api";
import { UserContext } from "../Contexts/UserContext";

export default function CreateEvent() {
  const { menuDrawerOpen, setMenuDrawerOpen } = useContext(MenuDrawerContext);
  const { userId } = useContext(UserContext);
  const [signupLimitInput, setSignupLimitInput] = useState(0);

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
    postEvent({ ...formData, organiser_id: userId }).then((data) => {
      console.log(data);
    });
  }

  return (
    <div
      className={menuDrawerOpen ? "margin-with-drawer" : "margin-no-drawer"}
      onClick={() => {
        setMenuDrawerOpen(false);
      }}
    >
      <h1 className="text-centre">Create a new event</h1>
      <form className="max-width-800">
        <img
          src={formData.image_URL}
          alt={formData.image_description}
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
              className="textarea"
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
        <button onClick={createEvent}>Create Event</button>
      </form>
    </div>
  );
}
