import { useContext, useEffect, useState } from "react";
import { MenuDrawerContext } from "../Contexts/MenuDrawContext";
import { getEventsOrganisedByUser } from "../api";
import { UserContext } from "../Contexts/UserContext";
import { Link } from "react-router";

export default function ManageEvents() {
  const { menuDrawerOpen, setMenuDrawerOpen } = useContext(MenuDrawerContext);
  const { userId } = useContext(UserContext);

  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);

  useEffect(() => {
    getEventsOrganisedByUser(userId, "curr")
      .then(({ events }) => {
        setEvents(events);
        return getEventsOrganisedByUser(userId, "past");
      })
      .then(({ events }) => {
        setPastEvents(events);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div
        className={menuDrawerOpen ? "margin-with-drawer" : "margin-no-drawer"}
        onClick={() => {
          setMenuDrawerOpen(false);
        }}
      >
        <p>Loading your events</p>
      </div>
    );
  }
  return (
    <div
      className={menuDrawerOpen ? "margin-with-drawer" : "margin-no-drawer"}
      onClick={() => {
        setMenuDrawerOpen(false);
      }}
    >
      <table>
        <thead>
          <tr>
            <td>Event Name</td>
            <td>event date</td>
            <td>Number of signups</td>
          </tr>
        </thead>
        <tbody>
          {events.map((event, index) => (
            <tr key={index}>
              <td>
                <Link to={`/manageEvents/details/${event.event_id}`}>
                  {event.event_name}
                </Link>
              </td>
              <td>{event.event_date}</td>
              <td>{event.signups}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Completed Events</p>
      <table>
        <thead>
          <tr>
            <td>Event Name</td>
            <td>event date</td>
            <td>Number of signups</td>
          </tr>
        </thead>
        <tbody>
          {pastEvents.map((event, index) => (
            <tr key={index}>
              <td>
                <Link to={`/manageEvents/details/${event.event_id}`}>
                  {event.event_name}
                </Link>
              </td>
              <td>{event.event_date}</td>
              <td>{event.signups}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
