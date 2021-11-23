import AppContext from "context/AppContext";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext } from "react";
import Card from "../components/UI/Card";
import UserInput from "../components/UserInput/UserInput";

const Home: NextPage = () => {
  const router = useRouter();
  const context = useContext(AppContext);

  const onSubmit = (username: string, roomName: string) => {
    context.setUsername(username);
    context.setRoomId(roomName);
    router.push(`/chat/${roomName}`);
  };
  
  return (
    <>
      <Card>
        <h2>Chat App</h2>
      </Card>
      <UserInput onSubmit={onSubmit} />
    </>
  );
};

export default Home;
