import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [userId, setUserId] = useState(localStorage.getItem("user_id"));
  const [admin, setAdmin] = useState(localStorage.getItem("admin"));
  const [name, setName] = useState(localStorage.getItem("name"));
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("access_token")
  );
  return (
    <UserContext.Provider
      value={{
        userId,
        setUserId,
        admin,
        setAdmin,
        name,
        setName,
        accessToken,
        setAccessToken,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
