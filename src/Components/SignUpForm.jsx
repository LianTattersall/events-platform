import { createUserWithEmailAndPassword } from "firebase/auth";
import { useContext, useState } from "react";
import { auth } from "../../firebase";
import { postUser } from "../api";
import { useNavigate } from "react-router";
import { UserContext } from "../Contexts/UserContext";

export default function SignUpForm() {
  const [nameInput, setNameInput] = useState("");
  const [email, setEmail] = useState("");
  const [adminInput, setAdminInput] = useState(true);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { setUserId, setName, setAdmin } = useContext(UserContext);

  const navigate = useNavigate();

  function createUser(e) {
    e.preventDefault();
    if (password != passwordConfirm) {
      setError("Passwords do not match");
    } else if (nameInput == "") {
      setError("Please enter a name");
    } else {
      setLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then((data) => {
          return postUser(data.user.uid, nameInput, email, adminInput);
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
          setLoading(false);

          if (err.code == "auth/weak-password") {
            setError("Password needs to be 6 characters or longer");
          } else if (err.code == "auth/email-already-in-use") {
            setError("This email is already in use");
          } else if (err.code == "auth/invalid-email") {
            setError("Invalid email address");
          } else if (err.code == "auth/missing-password") {
            setError("Please enter a password");
          } else {
            setError("An error has occured");
          }
        });
    }
  }

  if (loading) {
    return (
      <div className="centre-style">
        <p>Creating Account...</p>
      </div>
    );
  }

  return (
    <>
      <form className="login-signup-form">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          onChange={(e) => {
            setNameInput(e.target.value);
          }}
          value={nameInput}
          className="login-input"
        />
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
          className="login-input"
        />
        <div className="admin-container">
          <input
            type="radio"
            id="not-admin"
            name="admin"
            checked={!adminInput}
            onChange={() => {
              setAdminInput(false);
            }}
          ></input>
          <label htmlFor="not-admin">Non Staff Member</label>
          <div style={{ flex: 1 }}></div>
          <input
            type="radio"
            id="admin"
            name="admin"
            checked={adminInput}
            onChange={() => {
              setAdminInput(true);
            }}
          ></input>
          <label htmlFor="admin">Staff Member</label>
        </div>
        <label htmlFor="password">Enter A password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className="login-input"
        />
        <label htmlFor="confirm-password">Confirm password</label>
        <input
          type="password"
          id="confirm-password"
          value={passwordConfirm}
          onChange={(e) => {
            setPasswordConfirm(e.target.value);
          }}
          className="login-input"
        />
        {error != "" ? <p className="error">{error}</p> : null}
        <button onClick={createUser} className="login-signup-button">
          Create Account
        </button>
      </form>
    </>
  );
}
