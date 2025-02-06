import { useContext, useEffect, useState } from "react";
import { getSignUpStatus, postSignup } from "../api";
import { UserContext } from "../Contexts/UserContext";
import { Link } from "react-router";

export default function SignUpButton({ event_id }) {
  const { userId } = useContext(UserContext);

  const [signedUpAlready, setSignedUpAlready] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getSignUpStatus(userId, event_id)
      .then((result) => {
        setSignedUpAlready(true);
      })
      .catch(() => {
        setSignedUpAlready(false);
      });
  }, []);

  function handleSignup() {
    setSignedUpAlready(true);
    postSignup(userId, event_id).catch((err) => {
      setSignedUpAlready(false);
      if (err.message == "Request failed with status code 403") {
        setError("You are already signed up to this event");
      }
      setError("An error has occured");
    });
  }

  if (error) {
    return <p className="error">{error}</p>;
  }
  if (userId == undefined) {
    return (
      <Link to="/login">
        <button>Login to sign up</button>
      </Link>
    );
  }
  if (signedUpAlready == true) {
    return <p>Signed up!</p>;
  } else {
    return <button onClick={handleSignup}>Sign Up</button>;
  }
}
