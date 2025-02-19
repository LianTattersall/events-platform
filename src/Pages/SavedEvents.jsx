import { useContext, useEffect, useRef, useState } from "react";
import { MenuDrawerContext } from "../Contexts/MenuDrawContext";
import { getSavedEvents, getSavedTM } from "../api";
import { UserContext } from "../Contexts/UserContext";
import EventCardSmall from "../Components/EventCardSmall";

export default function SavedEvents() {
  const { menuDrawerOpen, setMenuDrawerOpen } = useContext(MenuDrawerContext);
  const { userId } = useContext(UserContext);

  const [events, setEvents] = useState([]);
  const [tM, setTM] = useState([]);
  const [loading, setLoading] = useState({ community: true, tm: true });
  const [loadingMore, setLoadingMore] = useState({
    community: false,
    tm: false,
  });
  const [error, setError] = useState("");

  const totalRef = useRef(null);
  const TMTotalRef = useRef(null);

  useEffect(() => {
    getSavedEvents(userId)
      .then(({ saved, total }) => {
        setEvents(saved);
        setLoading({ community: false, tm: true });
        totalRef.current = total;
        return getSavedTM(userId);
      })
      .then(({ saved, total }) => {
        setLoading({ community: false, tm: false });
        TMTotalRef.current = total;
        setTM(saved);
      });
  }, []);

  function LoadMore(offset, setter) {
    setLoadingMore((curr) => {
      return { ...curr, community: true };
    });
    getSavedEvents(userId, offset).then(({ saved }) => {
      setter((curr) => [...curr, ...saved]);
      setLoadingMore((curr) => {
        return { ...curr, community: false };
      });
    });
  }

  function LoadMoreTM(offset, setter) {
    setLoadingMore((curr) => {
      return { ...curr, tm: true };
    });
    getSavedTM(userId, offset).then(({ saved }) => {
      setter((curr) => [...curr, ...saved]);
      setLoadingMore((curr) => {
        return { ...curr, tm: false };
      });
    });
  }

  return (
    <div
      className={menuDrawerOpen ? "margin-with-drawer" : "margin-no-drawer"}
      onClick={() => {
        setMenuDrawerOpen(false);
      }}
    >
      {error != "" ? <p className="error text-centre">{error}</p> : null}
      <h1 className="text-centre">Saved Events</h1>
      <h2 style={{ paddingLeft: "10px" }}>Community Events</h2>
      {loading.community ? (
        <p className="text-centre">Loading events...</p>
      ) : null}
      <div className="flex-wrap-container">
        {events.map((event, index) => (
          <EventCardSmall
            key={index}
            event_id={event.event_id}
            event_name={event.event_name}
            image_URL={event.image_URL}
            event_date={event.event_date}
            type={"community"}
          />
        ))}
        {events.length == 0 && !loading.community ? (
          <p>No saved events!</p>
        ) : null}
      </div>
      {totalRef.current > events.length && !loadingMore.community ? (
        <div className="centre-flex-container">
          <button
            className="buttons"
            onClick={() => {
              LoadMore(events.length, setEvents);
            }}
          >
            Load More
          </button>
        </div>
      ) : null}
      {loadingMore.community ? (
        <p className="text-centre">Loading More</p>
      ) : null}
      <h2 style={{ paddingLeft: "10px" }}>Ticket Master Events</h2>
      {loading.tm ? <p className="text-centre">Loading events...</p> : null}
      <div className="flex-wrap-container">
        {tM.map((event, index) => (
          <EventCardSmall
            key={index}
            event_id={event.id}
            event_name={event.name}
            image_URL={event.images.url}
            event_date={event.dates.start.localDate}
            type={"TM"}
          />
        ))}
        {tM.length == 0 && !loading.tm ? <p>No saved events!</p> : null}
      </div>
      {TMTotalRef.current > tM.length && !loadingMore.tm ? (
        <div className="centre-flex-container">
          <button
            className="buttons"
            onClick={() => {
              LoadMoreTM(tM.length, setTM);
            }}
          >
            Load More
          </button>
        </div>
      ) : null}
      {loadingMore.tm ? <p className="text-centre">Loading More</p> : null}
    </div>
  );
}
