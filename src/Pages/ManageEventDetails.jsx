import { useContext, useEffect, useRef, useState } from "react";
import { MenuDrawerContext } from "../Contexts/MenuDrawContext";
import { getEventById, getSignupsForEvent } from "../api";
import { useParams } from "react-router";
import EditEventForm from "../Components/EditEventForm";

export default function ManageEventDetails() {
  const { setMenuDrawerOpen, menuDrawerOpen } = useContext(MenuDrawerContext);
  const { event_id } = useParams();

  const [searchTermInput, setSearchTermInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [attendees, setAttendees] = useState([]);
  const [event, setEvent] = useState({});
  const [edit, setEdit] = useState(false);
  const totalRef = useRef(null);

  useEffect(() => {
    getSignupsForEvent(event_id, searchTerm)
      .then(({ users, total }) => {
        setAttendees(users);
        if (totalRef.current == null) {
          totalRef.current = total;
        }
        return getEventById(event_id);
      })
      .then(({ event }) => {
        setEvent(event);
      });
  }, [searchTerm]);

  function handleEnter(e) {
    if (e.key == "Enter") {
      setSearchTerm(searchTermInput);
    }
  }

  const details = (
    <>
      <p>Event Name: {event.event_name}</p>
      <p>Description: {event.description}</p>
      <p>Event Date: {event.event_date}</p>
      <p>Start Time: {event.start_time}</p>
      <p>End Time: {event.end_time}</p>
      <p>Signup Limit: {event.signup_limit}</p>
      <p>Price: {event.price}</p>
      <p>First Line Address: {event.firstline_address}</p>
      <p>Postcode: {event.postcode}</p>
    </>
  );

  return (
    <div
      className={menuDrawerOpen ? "margin-with-drawer" : "margin-no-drawer"}
      onClick={() => {
        setMenuDrawerOpen(false);
      }}
    >
      <input
        type="text"
        style={{
          borderRadius: "25px",
          width: "70%",
          margin: "10px",
          border: "1px black solid",
          padding: "5px",
          paddingLeft: "10px",
        }}
        placeholder="Search for users"
        onChange={(e) => {
          setSearchTermInput(e.target.value);
        }}
        onKeyDown={handleEnter}
      />
      <button
        onClick={() => {
          setSearchTerm(searchTermInput);
        }}
      >
        Search
      </button>
      <p>Attendees</p>
      <table>
        <thead>
          <tr>
            <td>Name</td>
            <td>Email</td>
          </tr>
        </thead>
        <tbody>
          {attendees.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}

          <tr>
            <td>Total Signups:</td>
            <td>{totalRef.current}</td>
          </tr>
        </tbody>
      </table>
      <img
        src={event.image_URL}
        alt={event.image_description}
        style={{ height: "200px" }}
      />
      {edit ? (
        <EditEventForm setEdit={setEdit} event={event} setEvent={setEvent} />
      ) : (
        details
      )}
      {!edit ? (
        <button
          onClick={() => {
            setEdit(true);
          }}
        >
          Edit details
        </button>
      ) : null}
    </div>
  );
}
