import { useContext, useEffect, useRef, useState } from "react";
import { getEventsOrganisedByUser } from "../api";
import { UserContext } from "../Contexts/UserContext";
import { Link, useNavigate } from "react-router";
import { dateConverter } from "../utils";
import PageTemplate from "../Components/PageTemplate";

export default function ManageEvents() {
  const { userId } = useContext(UserContext);

  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [loadingMore, setLoadingMore] = useState({
    upcoming: false,
    past: false,
  });
  const [error, setError] = useState({
    initial: false,
    past: false,
    upcoming: false,
  });
  const totalRef = useRef({});
  const pRef = useRef({ upcoming: 1, past: 1 });

  const navigate = useNavigate();

  useEffect(() => {
    getEventsOrganisedByUser(userId, "curr")
      .then(({ events, total }) => {
        totalRef.current.upcoming = total;
        setEvents(events);
        return getEventsOrganisedByUser(userId, "past");
      })
      .then(({ events, total }) => {
        totalRef.current.past = total;
        setPastEvents(events);
        setLoading(false);
      })
      .catch(() => {
        setError((curr) => {
          return { ...curr, initial: true };
        });
      });
  }, []);

  function loadMore() {
    pRef.current.upcoming += 1;
    setLoadingMore((curr) => {
      return { ...curr, upcoming: true };
    });
    getEventsOrganisedByUser(userId, "curr", pRef.current.upcoming)
      .then(({ events }) => {
        setEvents((curr) => [...curr, ...events]);
        setLoadingMore((curr) => {
          return { ...curr, upcoming: false };
        });
        setError((curr) => {
          return { ...curr, upcoming: false };
        });
      })
      .catch(() => {
        setLoadingMore((curr) => {
          return { ...curr, upcoming: false };
        });
        setError((curr) => {
          return { ...curr, upcoming: true };
        });
      });
  }

  function loadMorePast() {
    pRef.current.past += 1;
    setLoadingMore((curr) => {
      return { ...curr, past: true };
    });
    getEventsOrganisedByUser(userId, "past", pRef.current.past)
      .then(({ events }) => {
        setPastEvents((curr) => [...curr, ...events]);
        setLoadingMore((curr) => {
          return { ...curr, past: false };
        });
        setError((curr) => {
          return { ...curr, past: false };
        });
      })
      .catch(() => {
        pRef.current.past -= 1;
        setError((curr) => {
          return { ...curr, past: true };
        });
        setLoadingMore((curr) => {
          return { ...curr, past: false };
        });
      });
  }

  if (error.initial) {
    return (
      <PageTemplate>
        <p className="text-centre error">
          An error has occured loading your events
        </p>
      </PageTemplate>
    );
  }

  if (loading) {
    return (
      <PageTemplate>
        <p className="text-centre">Loading your events</p>
      </PageTemplate>
    );
  }
  return (
    <PageTemplate>
      <h1 className="text-centre">My Events</h1>
      <h2 className="text-centre">Upcoming Events</h2>
      <table>
        <thead>
          <tr className="bold">
            <th>Event Name</th>
            <th>event date</th>
            <th className="text-centre">Signup count</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, index) => (
            <tr
              key={index}
              onClick={() => {
                navigate(`/manageEvents/details/${event.event_id}`);
              }}
            >
              <td>
                <Link
                  to={`/manageEvents/details/${event.event_id}`}
                  className="no-text-decoration"
                >
                  {event.event_name}
                </Link>
              </td>
              <td>{dateConverter(event.event_date)}</td>
              <td className="text-centre">{event.signups}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {totalRef.current.upcoming > events.length && !loadingMore.upcoming ? (
        <div className="centre-flex-container">
          <button className="buttons" onClick={loadMore}>
            Load More
          </button>
        </div>
      ) : null}
      {loadingMore.upcoming ? (
        <p className="text-centre">Loading more...</p>
      ) : null}
      {error.upcoming ? (
        <p className="error text-centre">
          An error has occured loading more events
        </p>
      ) : null}
      <h2 className="text-centre">Completed Events</h2>
      <table>
        <thead>
          <tr className="bold">
            <td>Event Name</td>
            <td>event date</td>
            <td className="text-centre">Signup count</td>
          </tr>
        </thead>
        <tbody>
          {pastEvents.map((event, index) => (
            <tr
              key={index}
              onClick={() => {
                navigate(`/manageEvents/details/${event.event_id}`);
              }}
            >
              <td>
                <Link
                  to={`/manageEvents/details/${event.event_id}`}
                  className="no-text-decoration"
                >
                  {event.event_name}
                </Link>
              </td>
              <td>{dateConverter(event.event_date)}</td>
              <td className="text-centre">{event.signups}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {totalRef.current.past > pastEvents.length && !loadingMore.past ? (
        <div className="centre-flex-container">
          <button className="buttons" onClick={loadMorePast}>
            Load More
          </button>
        </div>
      ) : null}
      {loadingMore.past ? <p className="text-centre">Loading more...</p> : null}
      {error.past ? (
        <p className="error text-centre">
          An error has occured loading more events
        </p>
      ) : null}
    </PageTemplate>
  );
}
