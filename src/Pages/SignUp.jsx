import { useContext, useState } from "react";
import { MenuDrawerContext } from "../Contexts/MenuDrawContext";
import SignUpForm from "../Components/SignUpForm";
import SignUpGoogle from "../Components/SignUpGoogle";

export default function SignUp() {
  const { menuDrawerOpen, setMenuDrawerOpen } = useContext(MenuDrawerContext);
  const [signupMethod, setSignupMethod] = useState("email");

  return (
    <div
      className={menuDrawerOpen ? "margin-with-drawer" : "margin-no-drawer"}
      onClick={() => {
        setMenuDrawerOpen(false);
      }}
    >
      <p
        className="signup-method"
        onClick={() => {
          setSignupMethod("email");
        }}
      >
        Email and Password
      </p>
      <p style={{ display: "inline" }}> | </p>
      <p
        className="signup-method"
        onClick={() => {
          setSignupMethod("google");
        }}
      >
        Google
      </p>
      {signupMethod == "email" ? <SignUpForm /> : null}
      {signupMethod == "google" ? <SignUpGoogle /> : null}
    </div>
  );
}
