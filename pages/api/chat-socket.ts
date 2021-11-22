import { NextApiRequest, NextApiResponse } from "next";
import { Server } from "socket.io";
//import { Server as httpServer } from "http";

const ioHandler = (req: NextApiRequest, res: any) => {
  if (!res.socket.server.io) {
    console.log("new server");
    const io = new Server(res.socket.server, { path: "/api/chat-socket" });

    io.on("connection", (socket) => {
      socket.broadcast.emit("connected!");
      socket.on("message", (msg) => {
        console.log("received");
        socket.emit("message", "Hello!!");
      });
    });

    res.socket.server.io = io;
  } else {
    console.log("already started");
  }

  res.end();
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default ioHandler;
