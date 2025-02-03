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

export const getTicketMaster = () => {
  return eventsApi
    .get("/ticketMaster/events.json", {
      params: {
        countryCode: "gb",
        startDateTime: "2025-02-04T00:00:00Z",
        endDateTime: "2025-02-04T23:00:00Z",
      },
    })
    .then(
      ({
        data: {
          data: { _embedded },
        },
      }) => {
        console.log(_embedded);
      }
    );
};
