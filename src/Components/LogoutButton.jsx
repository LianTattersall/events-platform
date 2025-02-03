import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useContext } from "react";
import { UserContext } from "../Contexts/UserContext";

export default function LogoutButton() {
  const { setUserId, setName, setAdmin } = useContext(UserContext);

  function handleLogout() {
    signOut(auth);
    localStorage.removeItem("user_id");
    localStorage.removeItem("name");
    localStorage.removeItem("admin");
    setUserId(null);
    setName(null);
    setAdmin(null);
  }
  return (
    <button onClick={handleLogout} className="button-no-display">
      <p className="navbar-label">Logout</p>
    </button>
  );
}
