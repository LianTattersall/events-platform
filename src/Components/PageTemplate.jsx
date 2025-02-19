import { useContext } from "react";
import { MenuDrawerContext } from "../Contexts/MenuDrawContext";
import Footer from "./Footer";

export default function PageTemplate({ children }) {
  const { menuDrawerOpen, setMenuDrawerOpen } = useContext(MenuDrawerContext);
  return (
    <div
      className={menuDrawerOpen ? "margin-with-drawer" : "margin-no-drawer"}
      onClick={() => {
        setMenuDrawerOpen(false);
      }}
      style={{ display: "flex", flexDirection: "column" }}
    >
      <div>{children}</div>
      <div style={{ flex: 1 }}></div>
      <Footer />
    </div>
  );
}
