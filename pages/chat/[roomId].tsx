import type { NextPage } from "next";
import io from "socket.io-client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Card from "../../components/UI/Card";
import Button from "../../components/UI/Button";

const ChatRoom: NextPage = () => {
  const [socket, _] = useState(() => io());
  const router = useRouter();
  const roomId = router.query["roomId"];

  useEffect(() => {
    if (!roomId) {
      return;
    }
    socket.emit("join", roomId);
    socket.on("connect", () => {
      console.log("socket connected");
      socket.emit("join", roomId);
    }),
    socket.on("status", (data) => {
      console.log(data);
    })
    socket.on("message", (data) => {
      console.log(data);
    })
  }, [roomId]);

  const buttonClick = () => {
    socket.emit("message", { message: "test!", roomId })
  };

  return (
    <Card>
      <h2>Chat room {roomId}</h2>
      <Button onClick={buttonClick}>Test</Button>
    </Card>
  );
};

export default ChatRoom;
