import { useContext, useEffect, useState } from "react";
import { MenuDrawerContext } from "../Contexts/MenuDrawContext";
import EventSlider from "../Components/EventSlider";
import { getEvents, getUpcomingTicketMaster } from "../api";
import DisplayEvents from "../Components/DisplayEvents";

export default function Home() {
  const { menuDrawerOpen, setMenuDrawerOpen } = useContext(MenuDrawerContext);

  const [events, setEvents] = useState([]);
  const [width, setWidth] = useState(window.innerWidth);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [displayEvents, setDisplayEvents] = useState([]);

  useEffect(() => {
    getUpcomingTicketMaster()
      .then((data) => {
        setEvents(data.events);
        return getEvents();
      })
      .then(({ events }) => {
        setDisplayEvents(events);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        setLoading(false);
      });

    function moniterWidth() {
      setWidth(window.innerWidth);
    }

    addEventListener("resize", moniterWidth);

    return () => window.removeEventListener("resize", moniterWidth);
  }, []);

  if (loading) {
    return (
      <div
        className={menuDrawerOpen ? "margin-with-drawer" : "margin-no-drawer"}
        onClick={() => {
          setMenuDrawerOpen(false);
        }}
      >
        <p>Loading Event Details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={menuDrawerOpen ? "margin-with-drawer" : "margin-no-drawer"}
        onClick={() => {
          setMenuDrawerOpen(false);
        }}
      >
        <p className="text-centre error">An error has occured</p>
      </div>
    );
  }

  const containerStyles = {
    width: "100vw",
    aspectRatio: "16/9",
    maxWidth: "500px",
    margin: "0 auto",
  };

  if (loading) {
    return <p>Loading content...</p>;
  }

  return (
    <div
      className={menuDrawerOpen ? "margin-with-drawer" : "margin-no-drawer"}
      onClick={() => {
        setMenuDrawerOpen(false);
      }}
    >
      <div style={containerStyles}>
        <EventSlider events={events} parentWidth={width >= 500 ? 500 : width} />
      </div>
      <div style={{ height: "20px" }}></div>
      <DisplayEvents events={displayEvents} />
    </div>
  );
}
