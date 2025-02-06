import EventCard from "./EventCard";

export default function DisplayEvents({ events }) {
  return (
    <div className="flex-wrap-container">
      {events.map((event, index) => (
        <EventCard event={event} key={index} />
      ))}
    </div>
  );
}
