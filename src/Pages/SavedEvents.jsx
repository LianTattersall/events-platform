import { useContext, useEffect, useRef, useState } from "react";
import { getSavedEvents, getSavedTM } from "../api";
import { UserContext } from "../Contexts/UserContext";
import EventCardSmall from "../Components/EventCardSmall";
import PageTemplate from "../Components/PageTemplate";

export default function SavedEvents() {
  const { userId } = useContext(UserContext);

  const [events, setEvents] = useState([]);
  const [tM, setTM] = useState([]);
  const [loading, setLoading] = useState({ community: true, tm: true });
  const [loadingMore, setLoadingMore] = useState({
    community: false,
    tm: false,
  });
  const [error, setError] = useState({
    community: false,
    tm: false,
    communityMore: false,
    tmMore: false,
  });

  const totalRef = useRef(null);
  const TMTotalRef = useRef(null);

  useEffect(() => {
    getSavedEvents(userId)
      .then(({ saved, total }) => {
        setEvents(saved);
        setLoading((curr) => {
          return { ...curr, community: false };
        });
        totalRef.current = total;
      })
      .catch((err) => {
        setLoading((curr) => {
          return { ...curr, community: false };
        });
        setError((curr) => {
          return { ...curr, community: true };
        });
      });

    getSavedTM(userId)
      .then(({ saved, total }) => {
        setLoading((curr) => {
          return { ...curr, tm: false };
        });
        TMTotalRef.current = total;
        setTM(saved);
      })
      .catch((err) => {
        setLoading((curr) => {
          return { ...curr, tm: false };
        });
        setError((curr) => {
          return { ...curr, tm: true };
        });
      });
  }, []);

  function LoadMore(offset, setter) {
    setLoadingMore((curr) => {
      return { ...curr, community: true };
    });
    getSavedEvents(userId, offset)
      .then(({ saved }) => {
        setter((curr) => [...curr, ...saved]);
        setLoadingMore((curr) => {
          return { ...curr, community: false };
        });
        setError((curr) => {
          return { ...curr, communityMore: false };
        });
      })
      .catch((err) => {
        setLoadingMore((curr) => {
          return { ...curr, community: false };
        });
        setError((curr) => {
          return { ...curr, communityMore: true };
        });
      });
  }

  function LoadMoreTM(offset, setter) {
    setLoadingMore((curr) => {
      return { ...curr, tm: true };
    });
    getSavedTM(userId, offset)
      .then(({ saved }) => {
        setter((curr) => [...curr, ...saved]);
        setLoadingMore((curr) => {
          return { ...curr, tm: false };
        });
        setError((curr) => {
          return { ...curr, tmMore: false };
        });
      })
      .catch((err) => {
        setLoadingMore((curr) => {
          return { ...curr, tm: false };
        });
        setError((curr) => {
          return { ...curr, tmMore: true };
        });
      });
  }

  return (
    <PageTemplate>
      <h1 className="text-centre">Saved Events</h1>
      <h2 style={{ paddingLeft: "10px" }}>Community Events</h2>

      {loading.community ? (
        <p className="text-centre">Loading events...</p>
      ) : null}

      {error.community ? (
        <p className="error text-centre">
          Error loading your saved community events
        </p>
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
        {events.length == 0 && !loading.community && !error.community ? (
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
      {error.communityMore ? (
        <p className="error text-centre">Error loading more events</p>
      ) : null}
      <h2 style={{ paddingLeft: "10px" }}>Ticket Master Events</h2>

      {loading.tm ? <p className="text-centre">Loading events...</p> : null}

      {error.tm && tM.length === 0 ? (
        <p className="error text-centre">
          Error loading your saved Ticket Master events
        </p>
      ) : null}
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
        {tM.length == 0 && !loading.tm && !error.tm ? (
          <p>No saved events!</p>
        ) : null}
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

      {error.tmMore ? (
        <p className="error text-centre">Error loading more events</p>
      ) : null}
    </PageTemplate>
  );
}
