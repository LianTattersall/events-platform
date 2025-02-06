import axios from "axios";

const eventsApi = axios.create({
  baseURL: "https://be-event-organiser.lwtcloudflareapitesting.workers.dev",
});

export const postUser = (user_id, name, email, admin) => {
  return eventsApi.post("/users", { user_id, name, email, admin });
};

export const getUser = (user_id) => {
  return eventsApi.get(`/users/${user_id}`).then(({ data }) => {
    return data;
  });
};

export const getUpcomingTicketMaster = () => {
  const start = new Date();
  start.setDate(start.getDate() + 7);
  start.setHours(0, 0, 0);

  const end = new Date();
  end.setDate(end.getDate() + 7);
  end.setHours(23, 0, 0);

  return eventsApi
    .get("/ticketMaster/events.json?size=5", {
      params: {
        countryCode: "gb",
        startDateTime: start.toISOString().slice(0, -5) + "Z",
        //endDateTime: end.toISOString().slice(0, -5) + "Z",
        sort: "date,asc",
      },
    })
    .then(
      ({
        data: {
          data: { _embedded },
        },
      }) => {
        _embedded.events.forEach((element) => {
          element.images = element.images.filter((img) => img.ratio == "16_9");
        });
        return _embedded;
      }
    );
};

export const getTicketMasterById = (event_id) => {
  return eventsApi(`/ticketMaster/events/${event_id}`).then(({ data }) => {
    return data.data;
  });
};

export const getEvents = () => {
  return eventsApi.get("/events?limit=9&type=current").then(({ data }) => {
    return data;
  });
};

export const getEventById = (event_id) => {
  return eventsApi.get(`/events/${event_id}`).then(({ data }) => {
    return data;
  });
};
