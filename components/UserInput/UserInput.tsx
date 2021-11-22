import React, { useRef } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import Input from "../UI/Input";

const UserInput: React.FC<{ onSubmit: (username: string) => void }> = (props) => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (usernameRef.current) {
      const usernameValue = usernameRef.current.value.trim();
      if (usernameValue) {
        props.onSubmit(usernameValue);
      }
    }
  };
  return (
    <form onSubmit={submitHandler}>
      <Card>
        <Input type="text" name="username" ref={usernameRef} label="Username" />
        <Button type="submit">Submit</Button>
      </Card>
    </form>
  );
};

export default UserInput;
