import { useEffect, useState } from "react";
import { getTicketMasterWithQueries } from "../api";
import TicketMasterEventCard from "./TicketMasterEventCard";

export default function TicketMasterEventSearch() {
  const [events, setEvents] = useState([]);
  const [start, setStart] = useState(
    new Date().toISOString().slice(0, -5) + "Z"
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [genre, setGenre] = useState("");
  const [region, setRegion] = useState("");

  useEffect(() => {
    getTicketMasterWithQueries(start, searchTerm, genre, region)
      .then((events) => {
        setEvents(events);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, [start, genre, region]);

  function handleDateChange(e) {
    setStart(new Date(e.target.value).toISOString().slice(0, -5) + "Z");
  }

  function handleEnter(e) {
    if (e.key == "Enter") {
      setLoading(true);
      getTicketMasterWithQueries(start, searchTerm, genre, region)
        .then((events) => {
          setEvents(events);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    }
  }

  function handleSearch() {
    setLoading(true);
    getTicketMasterWithQueries(start, searchTerm, genre, region)
      .then((events) => {
        setEvents(events);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }

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
          setSearchTerm(e.target.value);
        }}
        value={searchTerm}
        onKeyDown={handleEnter}
      />
      <button onClick={handleSearch}>Search</button>
      <label htmlFor="start-date">Date:</label>
      <input type="date" id="start-date" onChange={handleDateChange}></input>
      <label htmlFor="genre">Category:</label>
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

      <label htmlFor="region">Region</label>
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
      <div className="flex-wrap-container">
        {loading ? (
          <p>Loading events...</p>
        ) : (
          events.map((event, index) => (
            <TicketMasterEventCard key={index} event={event} />
          ))
        )}
        {events.length == 0 && !loading ? (
          <p>No events match this search. Sorry!</p>
        ) : null}
      </div>
    </>
  );
}
