import { useGoogleLogin } from "@react-oauth/google";
import { useContext, useState } from "react";
import { UserContext } from "../Contexts/UserContext";
import axios from "axios";
import { postUser } from "../api";
import { useNavigate } from "react-router";
import GoogleIcon from "@mui/icons-material/Google";

export default function SignUpGoogle() {
  const navigate = useNavigate();

  const { setAccessToken, setUserId, setName, setAdmin } =
    useContext(UserContext);

  const [error, setError] = useState("");

  const [adminInput, setAdminInput] = useState(true);

  function handleGoogleSignIn() {
    const login = useGoogleLogin({
      onSuccess: (codeResponse) => {
        localStorage.setItem("access_token", codeResponse.access_token);
        setAccessToken(codeResponse.access_token);

        return axios
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
            localStorage.setItem("user_id", user.user_id);
            localStorage.setItem("name", user.name);
            localStorage.setItem("admin", user.admin);
            setUserId(user.user_id);
            setName(user.name);
            setAdmin(String(user.admin));
            navigate("/");
          })
          .catch((err) => {
            if (err.message == "Request failed with status code 403") {
              setError(
                "An account already exists with this email, try logging in"
              );
            } else {
              setError("An error has occured");
            }
          });
      },
      onError: (error) => {
        setError("An error has occured");
      },
      scope: "https://www.googleapis.com/auth/calendar.events.owned",
    });
    return login;
  }

  return (
    <>
      <form className="login-signup-form">
        <div className="admin-container">
          <input
            type="radio"
            name="admin-status"
            id="admin"
            checked={adminInput}
            onChange={(e) => {
              setAdminInput(true);
            }}
          />
          <label htmlFor="admin">Organiser Account</label>
          <div style={{ flex: 1 }}></div>
          <input
            type="radio"
            name="admin-status"
            id="admin"
            checked={!adminInput}
            onChange={() => {
              setAdminInput(false);
            }}
          />
          <label htmlFor="admin">Regular Account</label>
        </div>
      </form>
      <div className="login-google-container centre-flex-container">
        <button
          onClick={handleGoogleSignIn()}
          className="login-signup-button login-google"
        >
          <GoogleIcon />
          <div style={{ width: "10px" }}></div>
          <p>Sign Up With Google</p>
        </button>
      </div>
      {error != "" ? <p className="error">{error}</p> : null}
    </>
  );
}
