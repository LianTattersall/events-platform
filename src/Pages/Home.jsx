import { useContext } from "react";
import { MenuDrawerContext } from "../Contexts/MenuDrawContext";

export default function Home() {
  const { menuDrawerOpen, setMenuDrawerOpen } = useContext(MenuDrawerContext);

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
