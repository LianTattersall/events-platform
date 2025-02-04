import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router";
import Home from "./Pages/Home";
import { MenuDrawerProvider } from "./Contexts/MenuDrawContext";
import Navbar from "./Components/Navbar";
import MenuDrawer from "./Components/MenuDrawer";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import { UserContextProvider } from "./Contexts/UserContext";
import ExternalEvent from "./Pages/ExternalEvent";

function App() {
  const [count, setCount] = useState(0);

  return (
    <UserContextProvider>
      <MenuDrawerProvider>
        <Navbar />
        <MenuDrawer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/externalEvent/:event_id" element={<ExternalEvent />} />
        </Routes>
      </MenuDrawerProvider>
    </UserContextProvider>
  );
}

export default App;
