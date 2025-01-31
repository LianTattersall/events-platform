import { useContext } from "react";
import { MenuDrawerContext } from "../Contexts/MenuDrawContext";

export default function Home() {
  const { menuDrawerOpen } = useContext(MenuDrawerContext);

  return (
    <>
      <div
        className={menuDrawerOpen ? "margin-with-drawer" : "margin-no-drawer"}
      >
        <h1>home</h1>
      </div>
    </>
  );
}
