import { useContext, useEffect, useState } from "react";
import { MenuDrawerContext } from "../Contexts/MenuDrawContext";
import { getSavedEvents, getSavedTM } from "../api";
import { UserContext } from "../Contexts/UserContext";
import EventCardSmall from "../Components/EventCardSmall";

export default function SavedEvents() {
  const { menuDrawerOpen, setMenuDrawerOpen } = useContext(MenuDrawerContext);
  const { userId } = useContext(UserContext);

  const [events, setEvents] = useState([]);
  const [tM, setTM] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSavedEvents(userId)
      .then(({ saved }) => {
        setEvents(saved);
        return getSavedTM(userId);
      })
      .then((data) => {
        setLoading(false);
        setTM(data);
      });
  }, []);

  if (loading) {
    return <p>Loading saved events...</p>;
  }

  return (
    <div
      className={menuDrawerOpen ? "margin-with-drawer" : "margin-no-drawer"}
      onClick={() => {
        setMenuDrawerOpen(false);
      }}
    >
      <p>Community Events</p>
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
        {events.length == 0 && !loading ? <p>No saved events!</p> : null}
      </div>
      <p>Ticket Master Events</p>
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
        {tM.length == 0 && !loading ? <p>No saved events!</p> : null}
      </div>
    </div>
  );
}
