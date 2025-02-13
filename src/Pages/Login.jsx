import { useContext, useState } from "react";
import { MenuDrawerContext } from "../Contexts/MenuDrawContext";
import LoginForm from "../Components/LoginForm";
import { Link } from "react-router";

export default function Login() {
  const { menuDrawerOpen, setMenuDrawerOpen } = useContext(MenuDrawerContext);

  return (
    <div
      className={menuDrawerOpen ? "margin-with-drawer" : "margin-no-drawer"}
      onClick={() => {
        setMenuDrawerOpen(false);
      }}
    >
      <h1 className="title-login-signup">Login</h1>
      <div className="centre-flex-container">
        <LoginForm />
        <Link to={"/signup"}>Not registered? Sign up here</Link>
      </div>
    </div>
  );
}
