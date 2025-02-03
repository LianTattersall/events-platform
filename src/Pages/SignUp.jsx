import { useContext, useState } from "react";
import { MenuDrawerContext } from "../Contexts/MenuDrawContext";
import SignUpForm from "../Components/SignUpForm";

export default function SignUp() {
  const { menuDrawerOpen, setMenuDrawerOpen } = useContext(MenuDrawerContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [admin, setAdmin] = useState(null);

  return (
    <div
      className={menuDrawerOpen ? "margin-with-drawer" : "margin-no-drawer"}
      onClick={() => {
        setMenuDrawerOpen(false);
      }}
    >
      <SignUpForm />
    </div>
  );
}
