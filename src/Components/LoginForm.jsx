import { signInWithEmailAndPassword } from "firebase/auth";
import { useContext, useState } from "react";
import { auth } from "../../firebase";
import { getUser } from "../api";
import { useNavigate } from "react-router";
import { UserContext } from "../Contexts/UserContext";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { setUserId, setAdmin, setName } = useContext(UserContext);

  function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
      .then((data) => {
        return getUser(data.user.uid);
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
        setLoading(false);
        if (err.code == "auth/invalid-credential") {
          setError("Incorrect email or password");
        } else if (err.code == "auth/invalid-email") {
          setError("Invalid email");
        } else if (err.code == "auth/missing-password") {
          setError("Please enter a password");
        }
        console.log(err);
      });
  }

  if (loading) {
    return (
      <div className="centre-style">
        <p>Logging In...</p>
      </div>
    );
  }

  return (
    <form className="form">
      <label htmlFor="email">Email</label>
      <input
        type="text"
        id="email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        value={email}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        value={password}
      />
      {error != "" ? <p className="error">{error}</p> : null}
      <button onClick={handleLogin}>Login</button>
    </form>
  );
}
