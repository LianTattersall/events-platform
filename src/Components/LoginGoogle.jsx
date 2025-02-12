import { useGoogleLogin } from "@react-oauth/google";
import { getUser } from "../api";
import axios from "axios";
import { useNavigate } from "react-router";
import { useContext, useState } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import { UserContext } from "../Contexts/UserContext";

export default function LoginGoogle() {
  const navigate = useNavigate();
  const { setUserId, setName, setAdmin, setAccessToken } =
    useContext(UserContext);
  const [error, setError] = useState("");

  function handleLogin() {
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
            console.log("hello");
            return getUser(data.id);
          })
          .then(({ user }) => {
            localStorage.setItem("user_id", user.user_id);
            localStorage.setItem("name", user.name);
            localStorage.setItem("admin", user.admin);
            setUserId(user.user_id);
            setName(user.name);
            setAdmin(String(user.admin));
            navigate("/");
          })
          .catch((err) => {
            if (err.message == "Request failed with status code 404") {
              setError("No account registered with this email, try signing up");
            }
          });
      },
      onError: (error) => console.log("Login Failed:", error),
      scope: "https://www.googleapis.com/auth/calendar.events.owned",
    });
    return login;
  }

  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <button onClick={handleLogin()} className="login-button login-google">
        <GoogleIcon />
        <div style={{ width: "10px" }}></div>
        <p>{"Login With Google"}</p>
      </button>
      {error != "" ? <p className="error">{error}</p> : null}
    </div>
  );
}
