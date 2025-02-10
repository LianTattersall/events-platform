import { useEffect, useRef, useState } from "react";
import { getEventsWithQueries } from "../api";
import DisplayEvents from "./DisplayEvents";
import Pagination from "./Pagination";

export default function CommunityEventSearch() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTermInput, setSearchTermInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [type, setType] = useState("current");
  const [orderby, setOrderby] = useState("asc");
  const [sortby, setSortby] = useState("date");
  const page = useRef(1);
  const totalRef = useRef(0);

  useEffect(() => {
    setLoading(true);
    getEventsWithQueries(sortby, orderby, searchTerm, type, 1).then(
      ({ events, total }) => {
        totalRef.current = total;
        page.current = 1;
        setLoading(false);
        setEvents(events);
      }
    );
  }, [sortby, orderby, type, searchTerm]);

  function handleEnter(e) {
    if (e.key == "Enter") {
      setSearchTerm(searchTermInput);
    }
  }

  function searchHandler() {
    setSearchTerm(searchTermInput);
  }

  function handleLoadMore() {
    page.current += 1;
    setLoadingMore(true);
    getEventsWithQueries(sortby, orderby, searchTerm, type, page.current).then(
      ({ events }) => {
        setLoadingMore(false);
        setEvents((curr) => [...curr, ...events]);
      }
    );
  }
  const loadMoreButton =
    totalRef.current > events.length ? (
      <button onClick={handleLoadMore}>Load More</button>
    ) : null;

  return (
    <>
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
          setSearchTermInput(e.target.value);
        }}
        value={searchTermInput}
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
      {loadingMore ? <p>Loading More events...</p> : loadMoreButton}
    </>
  );
}
