import { createContext, useState } from "react";

export const MenuDrawerContext = createContext();

export const MenuDrawerProvider = ({ children }) => {
  const [menuDrawerOpen, setMenuDrawerOpen] = useState(false);
  return (
    <MenuDrawerContext.Provider value={{ menuDrawerOpen, setMenuDrawerOpen }}>
      {children}
    </MenuDrawerContext.Provider>
  );
};
