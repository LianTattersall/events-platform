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
    >
      {children}
      <Footer />
    </div>
  );
}
