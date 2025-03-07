import { useEffect, useRef, useState } from "react";
import { getEventById, getSignupsForEvent } from "../api";
import { Link, useParams } from "react-router";
import EditEventForm from "../Components/EditEventForm";
import { init } from "@emailjs/browser";
import PageTemplate from "../Components/PageTemplate";
import { dateConverter } from "../utils";
import DeleteEvent from "../Components/DeleteEvent";

export default function ManageEventDetails() {
  const { event_id } = useParams();

  const [searchTermInput, setSearchTermInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [attendees, setAttendees] = useState([]);
  const [event, setEvent] = useState({});
  const [edit, setEdit] = useState(false);
  const [loadnig, setLoading] = useState({ initial: true, loadingMore: false });
  const [error, setError] = useState("");

  const totalRef = useRef(null);
  const pRef = useRef(1);

  useEffect(() => {
    pRef.current = 1;
    getSignupsForEvent(event_id, searchTerm, 1)
      .then(({ users, total }) => {
        setAttendees(users);
        if (totalRef.current == null) {
          totalRef.current = total;
        }
        return getEventById(event_id);
      })
      .then(({ event }) => {
        setLoading((curr) => {
          return { ...curr, initial: false };
        });
        setEvent(event);
        setError("");
      })
      .catch((err) => {
        setLoading((curr) => {
          return { ...curr, initial: false };
        });
        setError("Error loading page content");
      });
  }, [searchTerm]);

  function handleEnter(e) {
    if (e.key == "Enter") {
      setSearchTerm(searchTermInput);
    }
  }

  function loadMore() {
    pRef.current += 1;
    setLoading((curr) => {
      return { ...curr, loadingMore: true };
    });
    getSignupsForEvent(event_id, searchTerm, pRef.current)
      .then(({ users }) => {
        setAttendees((curr) => [...curr, ...users]);
        setLoading((curr) => {
          return { ...curr, loadingMore: false };
        });
      })
      .catch((err) => {
        pRef.current -= 1;
        setError("Error loading more attendees");
        setLoading((curr) => {
          return { ...curr, loadingMore: false };
        });
      });
  }

  if (loadnig.initial) {
    return (
      <PageTemplate>
        <p className="text-centre">Loading details...</p>
      </PageTemplate>
    );
  }

  if (error === "Error loading page content") {
    return (
      <PageTemplate>
        <p className="text-centre error">{error}</p>
      </PageTemplate>
    );
  }

  const details = (
    <div className="margin-auto">
      <div className="centre-flex-container">
        <img
          src={event.image_URL}
          alt={event.image_description}
          style={{ height: "200px", margin: "auto", borderRadius: "10px" }}
        />
      </div>
      <div className="details-container">
        <p>
          <span className="bold">Image Description: </span>
          {event.image_description}
        </p>
        <p>
          <span className="bold">Event Name: </span>
          {event.event_name}
        </p>
        <p>
          <span className="bold">Description: </span>
          {event.description}
        </p>
        <p>
          <span className="bold">Event Date: </span>
          {dateConverter(event.event_date)}
        </p>
        <p>
          <span className="bold">Start Time: </span>
          {event.start_time.slice(0, -3)}
        </p>
        <p>
          <span className="bold">End Time: </span>
          {event.end_time.slice(0, -3)}
        </p>
        <p>
          <span className="bold">Signup Limit: </span>
          {event.signup_limit || "Unlimited"}
        </p>
        <p>
          <span className="bold">Price: </span>£{event.price}
        </p>
        <p>
          <span className="bold">First Line Address: </span>
          {event.firstline_address}
        </p>
        <p>
          <span className="bold">Postcode: </span>
          {event.postcode}
        </p>

        <button
          className="buttons"
          onClick={() => {
            setEdit(true);
          }}
        >
          Edit details
        </button>
        <DeleteEvent
          event_id={event.event_id}
          signups={event.signups}
          event_name={event.event_name}
          organiser_email={event.organiser_email}
        />
      </div>
    </div>
  );

  return (
    <PageTemplate>
      <h1 className="text-centre">Event Details</h1>
      <h2 className="text-centre">Attendees</h2>
      <div className="search-users-container">
        <input
          type="text"
          className="search-users"
          placeholder="Search for users"
          onChange={(e) => {
            setSearchTermInput(e.target.value);
          }}
          onKeyDown={handleEnter}
        />
        <div style={{ width: "10px" }}></div>
        <button
          className="buttons"
          onClick={() => {
            setSearchTerm(searchTermInput);
          }}
        >
          Search
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <td>Name</td>
            <td>Email</td>
          </tr>
        </thead>
        <tbody>
          {attendees.map((user, index) => (
            <tr key={index} className="user-row">
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
      {totalRef.current > attendees.length && !loadnig.loadingMore ? (
        <div className="centre-flex-container">
          <button className="buttons" onClick={loadMore}>
            Load More Attendees
          </button>
        </div>
      ) : null}
      {loadnig.loadingMore && error == "" ? (
        <p className="text-centre">Loading more...</p>
      ) : null}
      {error === "Error loading more attendees" ? (
        <p className="text-centre error">Error loading more attendees</p>
      ) : null}
      {attendees.length > 0 ? (
        <div className="centre-flex-container">
          <Link
            to={`/emailUpdate/${event.event_id}`}
            className="buttons"
            style={{ textDecoration: "none", color: "black" }}
          >
            Send an email update to attendees
          </Link>
        </div>
      ) : null}
      <h2 className="text-centre">Details</h2>
      {edit ? (
        <EditEventForm setEdit={setEdit} event={event} setEvent={setEvent} />
      ) : (
        details
      )}
    </PageTemplate>
  );
}
