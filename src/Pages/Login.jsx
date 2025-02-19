import LoginForm from "../Components/LoginForm";
import { Link } from "react-router";
import PageTemplate from "../Components/PageTemplate";

export default function Login() {
  return (
    <PageTemplate>
      <h1 className="title-login-signup">Login</h1>
      <div className="centre-flex-container">
        <LoginForm />
        <Link to={"/signup"}>Not registered? Sign up here</Link>
      </div>
    </PageTemplate>
  );
}
