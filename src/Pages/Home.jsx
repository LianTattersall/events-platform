import { useContext, useEffect } from "react";
import { MenuDrawerContext } from "../Contexts/MenuDrawContext";
import { getTicketMaster } from "../api";

export default function Home() {
  const { menuDrawerOpen, setMenuDrawerOpen } = useContext(MenuDrawerContext);
  useEffect(() => {
    getTicketMaster();
  }, []);
  return (
    <>
      <div
        className={menuDrawerOpen ? "margin-with-drawer" : "margin-no-drawer"}
        onClick={() => {
          setMenuDrawerOpen(false);
        }}
      >
        <h1>home</h1>
      </div>
    </>
  );
}
