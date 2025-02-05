import { useContext, useState } from "react";
import { UserContext } from "../Contexts/UserContext";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";

export default function AddToGoogleCal({ eventName, date, dateTime }) {
  const { accessToken, setAccessToken } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  let dateStart = dateTime ? { dateTime } : { date };
  const endTime = new Date(dateTime || date);
  endTime.setHours(endTime.getHours() + 5);
  let dateEnd = dateTime ? { dateTime: endTime.toISOString() } : { date };

  const event = {
    summary: eventName,
    description: "TBC",
    start: {
      ...dateStart,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    end: {
      ...dateEnd,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
  };

  function addToCal() {
    setLoading(true);
    return axios
      .post(
        "https://www.googleapis.com/calendar/v3/calendars/primary/events",
        event,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then(({ data }) => {
        console.log(data);
        setSuccess(data.htmlLink);
        setError("");
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
      });
  }

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setAccessToken(codeResponse.access_token);
      localStorage.setItem("access_token", codeResponse.access_token);
      addToCal();
    },
    onError: (error) => console.log("Login Failed:", error),
    scope: "https://www.googleapis.com/auth/calendar.events.owned",
  });

  if (loading) {
    return <p>Adding Event to Calendar</p>;
  }

  if (error != "") {
    if (error == "Request failed with status code 401") {
      return (
        <>
          <p className="error">
            It looks like we don't have access to your google calendar. Please
            click on the button below to grant access to your google calendar
            and add the event to it!
          </p>
          <button onClick={login}>Add to Google Calendar</button>
        </>
      );
    } else {
      return <p>{error}</p>;
    }
  }

  if (success) {
    return (
      <>
        <p>Successfully added to google calendar</p>
        <a href={success} target="_blank">
          Go to google calendar
        </a>
      </>
    );
  }

  return <button onClick={addToCal}>Add to google calendar</button>;
}
