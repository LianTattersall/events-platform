import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { GoogleOAuthProvider } from "@react-oauth/google";

let googleClientId = "";
async function getEnv() {
  googleClientId = await import.meta.env.VITE_GOOGLE_CLIENT_ID;
}
await getEnv();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId={googleClientId}>
        <App />
      </GoogleOAuthProvider>
    </BrowserRouter>
  </StrictMode>
);
