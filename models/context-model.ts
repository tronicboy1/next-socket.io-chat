type ContextModel = {
  username: string | null;
  roomId: string | null;
  setUsername: (username: string) => void;
  setRoomId: (roomId: string) => void;
}

export default ContextModel;