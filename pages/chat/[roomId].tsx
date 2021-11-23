import type { NextPage } from "next";
import io from "socket.io-client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Card from "../../components/UI/Card";
import Button from "../../components/UI/Button";
import ChatBox from "components/Chat/ChatBox";
import MessageModel from "models/message-model";
import ChatInput from "components/Chat/ChatInput";

const ChatRoom: NextPage = () => {
  const [socket, _] = useState(() => io());
  const router = useRouter();
  const { roomId, username } = router.query;

  const [messages, setMessages] = useState<MessageModel[]>([]);

  useEffect(() => {
    if (!roomId) {
      return;
    }
    socket.emit("join", roomId);
    socket.on("connect", () => {
      console.log("socket connected");
      socket.emit("join", roomId);
    }),
      socket.on("message", (data) => {
        setMessages((prev) => [
          ...prev,
          { username: data.username, content: data.message, id: data.id },
        ]);
      });
  }, [roomId]);

  const buttonClick = () => {
    socket.emit("message", { message: "test!", roomId, username });
  };

  const sendMessage = (content: string) => {
    socket.emit("message", { message: content, roomId, username })
  };

  return (
    <>
    <Card>
      <h2>Chat room {roomId}</h2>
      <Button onClick={buttonClick}>Test</Button>
    </Card>
    <ChatBox messages={messages} />
    <ChatInput sendMessage={sendMessage} />
    </>
  );
};

export default ChatRoom;
