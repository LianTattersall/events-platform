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
import EventPage from "./Pages/EventPage";
import MySignups from "./Pages/MySignups";
import BrowseEvents from "./Pages/BrowseEvents";
import BrowseEventsTM from "./Pages/BrowseEventsTM";
import SavedEvents from "./Pages/SavedEvents";
import ManageEvents from "./Pages/ManageEvents";
import ManageEventDetails from "./Pages/ManageEventDetails";
import CreateEvent from "./Pages/CreateEvent";
import SignupToEvent from "./Pages/SignupToEvent";
import Confirmation from "./Pages/Confirmation";

function App() {
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
          <Route path="/events/:event_id" element={<EventPage />} />
          <Route path="/signups/:user_id" element={<MySignups />} />
          <Route path="/browseEvents" element={<BrowseEvents />} />
          <Route path="/browseEventsTM" element={<BrowseEventsTM />} />
          <Route path="/savedEvents/:user_id" element={<SavedEvents />} />
          <Route path="/manageEvents" element={<ManageEvents />} />
          <Route
            path="/manageEvents/details/:event_id"
            element={<ManageEventDetails />}
          />
          <Route path="/createEvent" element={<CreateEvent />} />
          <Route path="/signup/:event_id" element={<SignupToEvent />} />
          <Route path="/confirmation/:event_id" element={<Confirmation />} />
        </Routes>
      </MenuDrawerProvider>
    </UserContextProvider>
  );
}

export default App;
