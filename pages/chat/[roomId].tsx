import type { NextPage } from "next";
//import io from "socket.io-client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Card from "../../components/UI/Card";
import Button from "../../components/UI/Button";

const ChatRoom: NextPage = () => {
  const [socket, setSocket] = useState<{} | null>(null);
  const router = useRouter();
  const roomId = router.query["roomId"];

  useEffect(() => {}, []);

  const buttonClick = () => {};

  return (
    <Card>
      <h2>Chat room {roomId}</h2>
      <Button onClick={buttonClick}>Test</Button>
    </Card>
  );
};

export default ChatRoom;
