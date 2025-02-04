import { useGoogleLogin } from "@react-oauth/google";
import { useContext, useState } from "react";
import { UserContext } from "../Contexts/UserContext";
import axios from "axios";
import { postUser } from "../api";
import { useNavigate } from "react-router";

export default function SignUpGoogle() {
  const navigate = useNavigate();

  const { setAccessToken, setUserId, setName, setAdmin } =
    useContext(UserContext);

  const [error, setError] = useState("");
  const [adminInput, setAdminInput] = useState(true);

  function handleGoogleSignIn() {
    const login = useGoogleLogin({
      onSuccess: (codeResponse) => {
        setAccessToken(codeResponse.access_token);
        axios
          .get(
            `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`,
            {
              headers: {
                Authorization: `Bearer ${codeResponse.access_token}`,
                Accept: "application/json",
              },
            }
          )
          .then(({ data }) => {
            return postUser(data.id, data.name, data.email, adminInput);
          })
          .then(({ data: { user } }) => {
            setUserId(user.user_id);
            setName(user.name);
            setAdmin(user.admin);
            navigate("/");
          })
          .catch((err) => {
            console.log(err.message);
            if (err.message == "Request failed with status code 403") {
              setError(
                "An account already exists with this email, try logging in"
              );
            }
          });
      },
      onError: (error) => console.log("Login Failed:", error),
      scope: "https://www.googleapis.com/auth/calendar.events.owned",
    });
    return login;
  }
  return (
    <>
      <form className="form">
        <div>
          <label htmlFor="admin">Staff Member</label>
          <input
            type="radio"
            name="admin-status"
            id="admin"
            checked={adminInput}
            onChange={(e) => {
              setAdminInput(true);
            }}
          />
        </div>
        <div>
          <label htmlFor="admin">Non Staff Member</label>
          <input
            type="radio"
            name="admin-status"
            id="admin"
            checked={!adminInput}
            onChange={() => {
              setAdminInput(false);
            }}
          />
        </div>
      </form>
      <button onClick={handleGoogleSignIn()}>Sign Up With Google</button>
      {error != "" ? <p className="error">{error}</p> : null}
    </>
  );
}
