import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useContext } from "react";
import { UserContext } from "../Contexts/UserContext";
import { useNavigate } from "react-router";

export default function LogoutButton() {
  const { setUserId, setName, setAdmin } = useContext(UserContext);

  const navigate = useNavigate();

  function handleLogout() {
    signOut(auth);
    localStorage.removeItem("user_id");
    localStorage.removeItem("name");
    localStorage.removeItem("admin");
    setUserId(null);
    setName(null);
    setAdmin(null);
    navigate("/");
  }
  return (
    <button onClick={handleLogout} className="button-no-display drawer-label">
      <p style={{ margin: "0px" }}>Logout</p>
    </button>
  );
}
