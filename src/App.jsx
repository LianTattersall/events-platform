import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router";
import Home from "./Pages/Home";
import { MenuDrawerProvider } from "./Contexts/MenuDrawContext";
import Navbar from "./Components/Navbar";
import MenuDrawer from "./Components/MenuDrawer";

function App() {
  const [count, setCount] = useState(0);

  return (
    <MenuDrawerProvider>
      <Navbar />
      <MenuDrawer />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </MenuDrawerProvider>
  );
}

export default App;
