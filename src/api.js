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
    .get("/ticketMaster/events.json?", {
      params: {
        countryCode: "gb",
        startDateTime: start.toISOString().slice(0, -5) + "Z",
        size: 5,
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
          element.images = element.images.reduce(
            (highest, img) => (img.width > highest.width ? img : highest),
            element.images[0]
          );
        });
        return _embedded;
      }
    );
};

export const getTicketMasterById = (event_id) => {
  return eventsApi(`/ticketMaster/events/${event_id}`).then(({ data }) => {
    const event = data.data;
    event.images = event.images.reduce(
      (highest, img) => (img.width > highest.width ? img : highest),
      event.images[0]
    );
    return event;
  });
};

export const getEvents = () => {
  return eventsApi.get("/events?type=current").then(({ data }) => {
    return data;
  });
};

export const getEventById = (event_id) => {
  return eventsApi.get(`/events/${event_id}`).then(({ data }) => {
    return data;
  });
};

export const getSignUpStatus = (user_id, event_id) => {
  return eventsApi.get(`/users/${user_id}/signups/${event_id}`);
};

export const postSignup = (user_id, event_id) => {
  return eventsApi
    .post(`/users/${user_id}/signups`, { event_id })
    .then(({ data }) => {
      return data;
    });
};

export const getSavedStatus = (user_id, event_id) => {
  return eventsApi
    .get(`/users/${user_id}/saved/${event_id}`)
    .then(({ data }) => {
      return data;
    });
};

export const postSaved = (user_id, event_id) => {
  return eventsApi
    .post(`/users/${user_id}/saved`, { event_id })
    .then(({ data }) => {
      return data;
    });
};

export const getSignups = (user_id, p) => {
  return eventsApi
    .get(`/users/${user_id}/signups`, { params: { p } })
    .then(({ data }) => {
      return data;
    });
};

export const postSavedTicketMaster = (user_id, event_id) => {
  return eventsApi
    .post(`/externalEvents/${user_id}`, { event_id })
    .then(({ data }) => {
      return data;
    });
};

export const deleteSignup = (user_id, event_id) => {
  return eventsApi.delete(`/users/${user_id}/signups/${event_id}`);
};

export const getEventsWithQueries = (sortby, orderby, searchTerm, type, p) => {
  return eventsApi
    .get("/events", {
      params: { sortby, orderby, searchTerm, type, p },
    })
    .then(({ data }) => {
      return data;
    });
};

export const getSavedStatusTicketMaster = (user_id, event_id) => {
  return eventsApi
    .get(`/externalEvents/${user_id}/${event_id}`)
    .then(({ data }) => {
      return data;
    });
};

export const getTicketMasterWithQueries = (
  startDateTime,
  keyword,
  classificationName,
  marketId,
  page
) => {
  return eventsApi
    .get("/ticketMaster/events.json?size=15&countryCode=gb&sort=date,asc", {
      params: { startDateTime, keyword, classificationName, marketId, page },
    })
    .then(({ data }) => {
      if (data.data.page.totalElements == 0) {
        return { events: [], total: 0 };
      }
      const events = data.data._embedded.events;
      events.forEach((element) => {
        element.images = element.images.reduce(
          (highest, img) => (img.width > highest.width ? img : highest),
          element.images[0]
        );
      });

      return { events, total: data.data.page.totalElements };
    });
};

export const getSavedEvents = (user_id) => {
  return eventsApi.get(`/users/${user_id}/saved`).then(({ data }) => {
    return data;
  });
};

export const getSavedTM = (user_id) => {
  return eventsApi
    .get(`/externalEvents/${user_id}`)
    .then(({ data }) => {
      const promiseArr = data.events.map((event) =>
        getTicketMasterById(event.event_id)
      );
      return Promise.all(promiseArr);
    })
    .then((data) => {
      return data;
    });
};

export const deleteSaved = (user_id, event_id) => {
  return eventsApi.delete(`/users/${user_id}/saved/${event_id}`);
};

export const deleteSavedTm = (user_id, event_id) => {
  return eventsApi.delete(`/externalEvents/${user_id}/${event_id}`);
};

export const getEventsOrganisedByUser = (organiser_id, type) => {
  return eventsApi
    .get(`/events/organiser/${organiser_id}`, { params: { type } })
    .then(({ data }) => {
      return data;
    });
};

export const getSignupsForEvent = (event_id, searchTerm) => {
  return eventsApi
    .get(`/events/${event_id}/users`, { params: { searchTerm } })
    .then(({ data }) => {
      return data;
    });
};

export const patchEvent = (formData) => {
  const patchInfo = { ...formData };

  return eventsApi
    .patch(`/events/${formData.event_id}`, formData)
    .then(({ data }) => {
      return data;
    });
};

export const postEvent = (formData) => {
  return eventsApi.post("/events", formData).then(({ data }) => {
    return data;
  });
};
