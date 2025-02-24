import { useEffect, useRef, useState } from "react";
import { getEventsWithQueries } from "../api";
import DisplayEvents from "./DisplayEvents";

export default function CommunityEventSearch() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTermInput, setSearchTermInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [type, setType] = useState("current");
  const [orderby, setOrderby] = useState("asc");
  const [sortby, setSortby] = useState("date");
  const [error, setError] = useState("");
  const page = useRef(1);
  const totalRef = useRef(0);

  useEffect(() => {
    setLoading(true);
    getEventsWithQueries(sortby, orderby, searchTerm, type, 1)
      .then(({ events, total }) => {
        totalRef.current = total;
        page.current = 1;
        setLoading(false);
        setEvents(events);
      })
      .catch((err) => {
        setLoading(false);
        setLoadingMore(false);
        setError("initial");
      });
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
    getEventsWithQueries(sortby, orderby, searchTerm, type, page.current)
      .then(({ events }) => {
        setError("");
        setLoadingMore(false);
        setEvents((curr) => [...curr, ...events]);
      })
      .catch((err) => {
        page.current -= 1;
        setLoading(false);
        setLoadingMore(false);
        setError("more");
      });
  }
  const loadMoreButton =
    totalRef.current > events.length ? (
      <div className="centre-flex-container">
        <button onClick={handleLoadMore} className="buttons">
          Load more
        </button>
      </div>
    ) : null;

  return (
    <>
      {error == "initial" ? (
        <p className="text-centre error">
          An error has occured fetching the events
        </p>
      ) : null}
      <section className="search-bar-container">
        <input
          type="text"
          className="search-bar"
          placeholder={"Search for events"}
          onChange={(e) => {
            setSearchTermInput(e.target.value);
          }}
          value={searchTermInput}
          onKeyDown={handleEnter}
        />
        <button onClick={searchHandler} className="buttons">
          search
        </button>
      </section>
      <section className="controls-container">
        <div className="width-fit-content">
          <label htmlFor="type">Type of event: </label>
          <select
            id="type"
            onChange={(e) => {
              setType(e.target.value);
            }}
            value={type}
          >
            <option value="current">Upcoming events</option>
            <option value="all">All events (past and future)</option>
          </select>
        </div>
        <div className="width-fit-content">
          <label htmlFor="sortby">Sort by: </label>
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
        </div>
        <div className="width-fit-content">
          <label htmlFor="orderby">Orderby: </label>
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
        </div>
      </section>

      {events.length === 0 && !loading && error === "" ? (
        <p className="text-centre">No events match this search. Sorry!</p>
      ) : null}
      {loading ? (
        <p className="text-centre">Loading events ...</p>
      ) : (
        <DisplayEvents events={events} />
      )}
      {loadingMore ? (
        <p className="text-centre">Loading More events...</p>
      ) : (
        loadMoreButton
      )}
      {error == "more" ? (
        <p className="text-centre error">
          An error has occured loading more events
        </p>
      ) : null}
    </>
  );
}
