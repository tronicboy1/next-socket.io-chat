import type { NextPage } from "next";
import { useRouter } from "next/router";
import Card from "../components/UI/Card";
import UserInput from "../components/UserInput/UserInput";

const Home: NextPage = () => {
  const router = useRouter();

  const onSubmit = (username: string) => {
    console.log(username);
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
