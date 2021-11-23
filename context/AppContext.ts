import ContextModel from "models/context-model";
import React from "react";

const AppContext = React.createContext<ContextModel>({
  username: null,
  roomId: null,
  setUsername: () => {},
  setRoomId: () => {}
});

export default AppContext