import { useEffect, useRef, useState } from "react";
import { getEventsWithQueries } from "../api";
import DisplayEvents from "./DisplayEvents";
import Pagination from "./Pagination";

export default function CommunityEventSearch() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState("current");
  const [p, setP] = useState(1);
  const [orderby, setOrderby] = useState("asc");
  const [sortby, setSortby] = useState("date");
  const maxP = useRef(null);

  useEffect(() => {
    getEventsWithQueries(sortby, orderby, searchTerm, type, p).then(
      ({ events }) => {
        setLoading(false);
        if (events.length == 0 && maxP.current == null) {
          maxP.current = Math.max(1, p - 1);
        } else if (events.length != 0) {
          setEvents(events);
        }
      }
    );
  }, [p, sortby, orderby, type]);

  function handleEnter(e) {
    if (e.key == "Enter") {
      setLoading(true);
      getEventsWithQueries(sortby, orderby, searchTerm, type).then(
        ({ events }) => {
          setEvents(events);
          setLoading(false);
        }
      );
    }
  }

  function searchHandler() {
    setLoading(true);
    getEventsWithQueries(sortby, orderby, searchTerm).then(({ events }) => {
      setEvents(events);
      setLoading(false);
    });
  }

  return (
    <div style={{ width: "100%" }}>
      <input
        type="text"
        style={{
          borderRadius: "25px",
          width: "70%",
          margin: "30px",
          border: "1px black solid",
          padding: "10px",
          paddingLeft: "10px",
        }}
        placeholder={"Search for events"}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
        value={searchTerm}
        onKeyDown={handleEnter}
      />

      <label htmlFor="type">Type of event</label>
      <select
        id="type"
        onChange={(e) => {
          setType(e.target.value);
          setP(1);
          maxP.current = null;
        }}
        value={type}
      >
        <option value="current">Upcoming events</option>
        <option value="all">All events (past and future)</option>
      </select>

      <label htmlFor="sortby">Sort by:</label>
      <select
        name="sortby"
        id="sortby"
        onChange={(e) => {
          setSortby(e.target.value);
        }}
        value={sortby}
      >
        <option value="price">price</option>
        <option value="date">date</option>
      </select>

      <label htmlFor="orderby">Orderby:</label>
      <select
        name="orderby"
        id="orderby"
        onChange={(e) => {
          setOrderby(e.target.value);
        }}
        value={orderby}
      >
        <option value="asc">ascending</option>
        <option value="desc">descending</option>
      </select>
      <button onClick={searchHandler}>search</button>

      {events.length == 0 && !loading ? (
        <p>No events match this search. Sorry!</p>
      ) : null}
      {loading ? <p>Loading events ...</p> : <DisplayEvents events={events} />}
      <Pagination p={p} maxP={maxP} setP={setP} />
    </div>
  );
}
