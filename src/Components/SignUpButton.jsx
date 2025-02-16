import { useContext, useEffect, useState } from "react";
import { getSignUpStatus } from "../api";
import { UserContext } from "../Contexts/UserContext";
import { Link, useNavigate } from "react-router";

export default function SignUpButton({ event_id }) {
  const { userId } = useContext(UserContext);

  const [signedUpAlready, setSignedUpAlready] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    getSignUpStatus(userId, event_id)
      .then((result) => {
        setSignedUpAlready(true);
      })
      .catch(() => {
        setSignedUpAlready(false);
      });
  }, []);

  if (userId == undefined) {
    return (
      <Link to="/login">
        <button className="buttons">Login to sign up</button>
      </Link>
    );
  }

  if (signedUpAlready) {
    return <p className="inline">Signed up!</p>;
  } else {
    return (
      <button
        className="buttons"
        onClick={() => {
          navigate(`/signup/${event_id}`);
        }}
      >
        Sign Up
      </button>
    );
  }
}
