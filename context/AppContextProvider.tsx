import ContextModel from "models/context-model";
import React, { useState } from "react";
import AppContext from "./AppContext";

const AppContextProvider: React.FC = ({ children }) => {
  const [username, setUsername] = useState<string | null>(null)
  const [roomId, setRoomId] = useState<string | null>(null);

  const value: ContextModel = {
    username,
    roomId,
    setUsername,
    setRoomId
  }
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export default AppContextProvider