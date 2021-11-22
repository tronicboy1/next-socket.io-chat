import type { NextPage } from "next";
import io from "socket.io-client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Card from "../../components/UI/Card";
import Button from "../../components/UI/Button";

const ChatRoom: NextPage = () => {
  const [socket, setSocket] = useState< {} | null>(null);
  const router = useRouter();
  const roomId = router.query["roomId"];

  useEffect(() => {
    fetch("/api/chat-socket").finally(() => {
      const newSocket = io("http://localhost:3000", { path: "/api/chat-socket" });
      newSocket.on("connect", () => {
        console.log("client connect");
        newSocket.emit("message");
      })
      newSocket.on("message", (msg) => {
        console.log(msg);
      })
      setSocket(newSocket);
    })
  }, [])

  const buttonClick = () => {
    socket.emit("message");
  };

  return (
    <Card>
      <h2>Chat room {roomId}</h2>
      <Button onClick={buttonClick}>Test</Button>
    </Card>
  );
};

export default ChatRoom;
