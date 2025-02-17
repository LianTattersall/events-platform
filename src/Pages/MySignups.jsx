import { useContext, useEffect, useRef, useState } from "react";
import { MenuDrawerContext } from "../Contexts/MenuDrawContext";
import { deleteSignup, getSignups } from "../api";
import { UserContext } from "../Contexts/UserContext";
import SignupList from "../Components/SignupList";

export default function MySignups() {
  const { menuDrawerOpen, setMenuDrawerOpen } = useContext(MenuDrawerContext);
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
      return { ...curr, upcoming: true };
    });
    getSignups(userId, type, offset).then(({ signups }) => {
      setter((curr) => [...curr, ...signups]);
      setLoading((curr) => {
        return { ...curr, upcoming: false };
      });
    });
  }

  if (loading.initial) {
    return (
      <div
        className={menuDrawerOpen ? "margin-with-drawer" : "margin-no-drawer"}
        onClick={() => {
          setMenuDrawerOpen(false);
        }}
      >
        <p>Loading signups...</p>
      </div>
    );
  }

  if (signups.length == 0) {
    return (
      <div
        className={menuDrawerOpen ? "margin-with-drawer" : "margin-no-drawer"}
        onClick={() => {
          setMenuDrawerOpen(false);
        }}
      >
        <p>No signups yet!</p>
      </div>
    );
  }

  return (
    <div
      className={menuDrawerOpen ? "margin-with-drawer" : "margin-no-drawer"}
      onClick={() => {
        setMenuDrawerOpen(false);
      }}
    >
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
    </div>
  );
}
