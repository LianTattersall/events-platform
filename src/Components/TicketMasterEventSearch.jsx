import { useEffect, useRef, useState } from "react";
import { getTicketMasterWithQueries } from "../api";
import EventCardSmall from "./EventCardSmall";

export default function TicketMasterEventSearch() {
  const [events, setEvents] = useState([]);
  const [start, setStart] = useState(
    new Date().toISOString().slice(0, -5) + "Z"
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTermInput, setSearchTermInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [genre, setGenre] = useState("");
  const [region, setRegion] = useState("");
  const page = useRef(0);
  const totalRef = useRef(0);

  useEffect(() => {
    setLoading(true);
    getTicketMasterWithQueries(start, searchTerm, genre, region, 0)
      .then(({ events, total }) => {
        setEvents(events);
        setLoading(false);
        totalRef.current = total;
        page.current = 0;
      })
      .catch((err) => {
        setLoading(false);
      });
  }, [start, genre, region, searchTerm]);

  function handleLoadMore() {
    if (events.length < totalRef.current) {
      setLoadingMore(true);
      page.current += 1;

      getTicketMasterWithQueries(start, searchTerm, genre, region, page.current)
        .then(({ events }) => {
          setEvents((curr) => [...curr, ...events]);
          setLoadingMore(false);
        })
        .catch((err) => {
          setLoadingMore(false);
        });
    }
  }

  function handleDateChange(e) {
    setStart(new Date(e.target.value).toISOString().slice(0, -5) + "Z");
  }

  function handleEnter(e) {
    if (e.key == "Enter") {
      setSearchTerm(searchTermInput);
    }
  }

  function handleSearch() {
    setSearchTerm(searchTermInput);
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
        <button onClick={handleSearch} className="buttons">
          Search
        </button>
      </section>
      <section className="controls-container">
        <div className="width-fit-content">
          <label htmlFor="start-date">Date: </label>
          <input
            type="date"
            id="start-date"
            onChange={handleDateChange}
          ></input>
        </div>
        <div className="width-fit-content">
          <label htmlFor="genre">Category: </label>
          <select
            name="classification"
            onChange={(e) => {
              setGenre(e.target.value);
            }}
            value={genre}
            id="genre"
          >
            <option value="">All</option>
            <option value="Music">Music</option>
            <option value="Sports">Sports</option>
            <option value="Arts & Theatre">Arts & Theatre</option>
            <option value="Comedy">Comedy</option>
            <option value="Film">Film</option>
            <option value="Family">Family</option>

            <optgroup label="Music Genres">
              <option value="Rock">Rock</option>
              <option value="Pop">Pop</option>
              <option value="Hip-Hop/Rap">Hip-Hop/Rap</option>
              <option value="Jazz">Jazz</option>
              <option value="Classical">Classical</option>
              <option value="Electronic">Electronic</option>
              <option value="Country">Country</option>
            </optgroup>

            <optgroup label="Sports Categories">
              <option value="Football">Football</option>
              <option value="Tennis">Tennis</option>
              <option value="Cricket">Cricket</option>
              <option value="Rugby">Rugby</option>
              <option value="Motorsports">Motorsports</option>
              <option value="Boxing">Boxing</option>
            </optgroup>

            <optgroup label="Arts & Theatre">
              <option value="Musical">Musical</option>
              <option value="Opera">Opera</option>
              <option value="Ballet">Ballet</option>
              <option value="Theatre">Theatre</option>
            </optgroup>
          </select>
        </div>
        <div className="width-fit-content">
          <label htmlFor="region">Region: </label>
          <select
            name="marketId"
            onChange={(e) => {
              setRegion(e.target.value);
            }}
            value={region}
          >
            <option value="">GB and NI</option>
            <option value="202">London (UK)</option>
            <option value="203">South (UK)</option>
            <option value="204">Midlands and Central (UK)</option>
            <option value="205">Wales and North West (UK)</option>
            <option value="206">North and North East (UK)</option>
            <option value="207">Scotland</option>
            <option value="208">Ireland</option>
            <option value="209">Northern Ireland</option>
          </select>
        </div>
      </section>
      <section className="flex-wrap-container" style={{ margin: "20px" }}>
        {loading ? (
          <p>Loading events...</p>
        ) : (
          events.map((event, index) => (
            <EventCardSmall
              key={index}
              event_id={event.id}
              image_URL={event.images.url}
              event_date={event.dates.start.localDate}
              event_name={event.name}
            />
          ))
        )}

        {events.length == 0 && !loading ? (
          <p>No events match this search. Sorry!</p>
        ) : null}
      </section>
      {loadingMore ? (
        <p className="text-centre">Loading more events...</p>
      ) : (
        loadMoreButton
      )}
    </>
  );
}
