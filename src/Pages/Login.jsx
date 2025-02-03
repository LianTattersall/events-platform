import { useContext } from "react";
import { MenuDrawerContext } from "../Contexts/MenuDrawContext";
import LoginForm from "../Components/LoginForm";

export default function Login() {
  const { menuDrawerOpen, setMenuDrawerOpen } = useContext(MenuDrawerContext);
  return (
    <div
      className={menuDrawerOpen ? "margin-with-drawer" : "margin-no-drawer"}
      onClick={() => {
        setMenuDrawerOpen(false);
      }}
    >
      <LoginForm />
    </div>
  );
}
