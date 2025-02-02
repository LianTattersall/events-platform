import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router";
import Home from "./Pages/Home";
import { MenuDrawerProvider } from "./Contexts/MenuDrawContext";
import Navbar from "./Components/Navbar";
import MenuDrawer from "./Components/MenuDrawer";
import SignUp from "./Pages/SignUp";

function App() {
  const [count, setCount] = useState(0);

  return (
    <MenuDrawerProvider>
      <Navbar />
      <MenuDrawer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />}></Route>
      </Routes>
    </MenuDrawerProvider>
  );
}

export default App;
