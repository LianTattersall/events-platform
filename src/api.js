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
