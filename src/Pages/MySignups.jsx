import { useContext, useEffect, useRef, useState } from "react";
import { getSignups } from "../api";
import { UserContext } from "../Contexts/UserContext";
import SignupList from "../Components/SignupList";
import PageTemplate from "../Components/PageTemplate";

export default function MySignups() {
  const { userId } = useContext(UserContext);

  const [signups, setSignups] = useState([]);
  const [pastSignups, setPastSignups] = useState([]);
  const [error, setError] = useState("");
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
        setError(true);
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
    getSignups(userId, type, offset).then(({ signups }) => {
      setter((curr) => [...curr, ...signups]);
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
        <p>Loading signups...</p>
      </PageTemplate>
    );
  }

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
        total={signupTotal}
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

      <h2 className="bold" style={{ paddingLeft: "10px" }}>
        Completed
      </h2>
      <SignupList
        signups={pastSignups}
        setError={setError}
        setSignups={setPastSignups}
        userId={userId}
      />
      {loading.past ? <p className="text-centre">Loading more...</p> : null}
      {pastTotal.current > pastSignups.length && !loading.past ? (
        <div className="centre-flex-container">
          <button
            className="buttons"
            onClick={() => {
              LoadMore("past", signups.length, setSignups);
            }}
          >
            Load More
          </button>
        </div>
      ) : null}

      {error != "" ? <p className="error">{error}</p> : null}
    </PageTemplate>
  );
}
