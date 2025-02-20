import { useContext } from "react";
import { MenuDrawerContext } from "../Contexts/MenuDrawContext";
import Footer from "./Footer";

export default function PageTemplate({ children }) {
  const { menuDrawerOpen, setMenuDrawerOpen } = useContext(MenuDrawerContext);
  return (
    <main
      className={menuDrawerOpen ? "margin-with-drawer" : "margin-no-drawer"}
      onClick={() => {
        setMenuDrawerOpen(false);
      }}
      style={{ display: "flex", flexDirection: "column" }}
      id="main"
    >
      <div>{children}</div>
      <div style={{ flex: 1 }}></div>
      <Footer />
    </main>
  );
}
