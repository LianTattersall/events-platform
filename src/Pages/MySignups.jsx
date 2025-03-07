import { useContext, useEffect, useRef, useState } from "react";
import { getSignups } from "../api";
import { UserContext } from "../Contexts/UserContext";
import SignupList from "../Components/SignupList";
import PageTemplate from "../Components/PageTemplate";

export default function MySignups() {
  const { userId } = useContext(UserContext);

  const [signups, setSignups] = useState([]);
  const [pastSignups, setPastSignups] = useState([]);
  const [error, setError] = useState({
    initial: false,
    past: false,
    upcoming: false,
  });
  const [loading, setLoading] = useState({
    initial: true,
    upcoming: false,
    past: false,
  });

  const signupTotal = useRef(null);
  const pastTotal = useRef(null);

  useEffect(() => {
    getSignups(userId, "curr")
      .then(({ signups, total }) => {
        signupTotal.current = total;
        setSignups(signups);
        return getSignups(userId, "past");
      })
      .then(({ signups, total }) => {
        pastTotal.current = total;
        setPastSignups(signups);
        setLoading(false);
      })
      .catch(() => {
        setError((curr) => {
          return { ...curr, initial: true };
        });
        setLoading((curr) => {
          return { ...curr, initial: false };
        });
      });
  }, []);

  function LoadMore(type, offset, setter) {
    setLoading((curr) => {
      if (type == "curr") {
        return { ...curr, upcoming: true };
      } else if (type == "past") {
        return { ...curr, past: true };
      }
    });
    getSignups(userId, type, offset)
      .then(({ signups }) => {
        setter((curr) => [...curr, ...signups]);
        setLoading((curr) => {
          if (type == "curr") {
            return { ...curr, upcoming: false };
          } else if (type == "past") {
            return { ...curr, past: false };
          }
        });
        setError((curr) => {
          if (type == "curr") {
            return { ...curr, upcoming: false };
          } else if (type == "past") {
            return { ...curr, past: false };
          }
        });
      })
      .catch((err) => {
        setError((curr) => {
          if (type == "curr") {
            return { ...curr, upcoming: true };
          } else if (type == "past") {
            return { ...curr, past: true };
          }
        });
        setLoading((curr) => {
          if (type == "curr") {
            return { ...curr, upcoming: false };
          } else if (type == "past") {
            return { ...curr, past: false };
          }
        });
      });
  }

  if (loading.initial) {
    return (
      <PageTemplate>
        <p className="text-centre">Loading signups...</p>
      </PageTemplate>
    );
  }

  if (error.initial) {
    return (
      <PageTemplate>
        <p className="text-centre error">
          An error has occured fetching your signups
        </p>
      </PageTemplate>
    );
  }
  console.log(signupTotal);
  return (
    <PageTemplate>
      <h1 className="text-centre">Signups</h1>
      <h2 className="bold" style={{ paddingLeft: "10px" }}>
        Upcoming
      </h2>
      <SignupList
        signups={signups}
        setError={setError}
        setSignups={setSignups}
        userId={userId}
        type={"upcoming"}
        signupTotal={signupTotal}
        pastTotal={pastTotal}
      />
      {loading.upcoming ? <p className="text-centre">Loading more...</p> : null}
      {signupTotal.current > signups.length && !loading.upcoming ? (
        <div className="centre-flex-container">
          <button
            className="buttons"
            onClick={() => {
              LoadMore("curr", signups.length, setSignups);
            }}
          >
            Load More
          </button>
        </div>
      ) : null}
      {error.upcoming ? (
        <p className="error text-centre">
          An error has occured loading more events
        </p>
      ) : null}

      <h2 className="bold" style={{ paddingLeft: "10px" }}>
        Completed
      </h2>
      <SignupList
        signups={pastSignups}
        setError={setError}
        setSignups={setPastSignups}
        userId={userId}
        type={"past"}
        signupTotal={signupTotal}
        pastTotal={pastTotal}
      />
      {loading.past ? <p className="text-centre">Loading more...</p> : null}
      {pastTotal.current > pastSignups.length && !loading.past ? (
        <div className="centre-flex-container">
          <button
            className="buttons"
            onClick={() => {
              LoadMore("past", signups.length, setPastSignups);
            }}
          >
            Load More
          </button>
        </div>
      ) : null}

      {error.past ? (
        <p className="error text-centre">
          An error has occured loading more events
        </p>
      ) : null}
    </PageTemplate>
  );
}
