import { useContext } from "react";
import { MenuDrawerContext } from "../Contexts/MenuDrawContext";

export default function ManageEvents() {
  const { menuDrawerOpen, setMenuDrawerOpen } = useContext(MenuDrawerContext);
  return (
    <div
      className={menuDrawerOpen ? "margin-with-drawer" : "margin-no-drawer"}
      onClick={() => {
        setMenuDrawerOpen(false);
      }}
    ></div>
  );
}
