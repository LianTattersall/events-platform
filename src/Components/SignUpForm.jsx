import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../firebase";
import { postUser } from "../api";

export default function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [admin, setAdmin] = useState(true);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  console.log(password, passwordConfirm, admin);

  function createUser(e) {
    e.preventDefault();
    if (password != passwordConfirm) {
      setError("Passwords do not match");
    } else {
      setLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then((data) => {
          return postUser(data.user.uid, name, email, admin);
        })
        .then(({ data }) => {
          localStorage.setItem("user_id", data.user.user_id);
        })
        .catch((err) => {
          setLoading(false);

          if (err.code == "auth/weak-password") {
            setError("Password needs to be 6 characters or longer");
          } else if (err.code == "auth/email-already-in-use") {
            setError("This email is already in use");
          } else if (err.code == "auth/invalid-email") {
            setError("Invalid email address");
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
      <form className="signup-form">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
        />
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
        />
        <div>
          <label htmlFor="admin">Staff Member</label>
          <input
            type="radio"
            id="admin"
            name="admin"
            checked={admin}
            onChange={() => {
              setAdmin(true);
            }}
          ></input>
          <label htmlFor="not-admin">Non Staff Member</label>
          <input
            type="radio"
            id="not-admin"
            name="admin"
            checked={!admin}
            onChange={() => {
              setAdmin(false);
            }}
          ></input>
        </div>
        <label htmlFor="password">Enter A password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <label htmlFor="confirm-password">Confirm password</label>
        <input
          type="password"
          id="confirm-password"
          value={passwordConfirm}
          onChange={(e) => {
            setPasswordConfirm(e.target.value);
          }}
        />
        {error != "" ? <p className="error">{error}</p> : null}
        <button onClick={createUser}>Create Account</button>
      </form>
    </>
  );
}
