import { useContext, useState } from "react";
import { MenuDrawerContext } from "../Contexts/MenuDrawContext";
import SignUpForm from "../Components/SignUpForm";
import SignUpGoogle from "../Components/SignUpGoogle";
import GoogleIcon from "@mui/icons-material/Google";
import { Link } from "react-router";

export default function SignUp() {
  const { menuDrawerOpen, setMenuDrawerOpen } = useContext(MenuDrawerContext);
  const [signupMethod, setSignupMethod] = useState("email");

  const emailOptions = (
    <div className="centre-flex-container">
      <SignUpForm />
      <p style={{ textAlign: "center" }}>OR</p>
      <div className="login-google-container centre-flex-container">
        <button
          onClick={() => {
            setSignupMethod("google");
          }}
          className="login-signup-button login-google"
        >
          <GoogleIcon />
          <div style={{ width: "10px" }}></div>
          <p>Sign up with Google</p>
        </button>
      </div>
      <Link to={"/login"}>Already have an account? Login here</Link>
    </div>
  );

  const googleOptions = (
    <div className="centre-flex-container">
      <SignUpGoogle />
      <p style={{ textAlign: "center" }}>OR</p>
      <div className="login-google-container centre-flex-container">
        <button
          className="login-google login-signup-button"
          onClick={() => {
            setSignupMethod("email");
          }}
        >
          Sign Up with Email and Password
        </button>
      </div>
      <Link to={"/login"}>Already have an account? Login here</Link>
    </div>
  );

  return (
    <div
      className={menuDrawerOpen ? "margin-with-drawer" : "margin-no-drawer"}
      onClick={() => {
        setMenuDrawerOpen(false);
      }}
    >
      <h1 className="title-login-signup">Sign Up</h1>

      {signupMethod == "email" ? emailOptions : null}
      {signupMethod == "google" ? googleOptions : null}
    </div>
  );
}
