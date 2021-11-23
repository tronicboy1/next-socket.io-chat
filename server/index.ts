import { Server as nextServer, createServer } from "http";
//import { parse } from 'url'
import next, { NextApiHandler, NextApiRequest } from "next";
import { Server as socketioServer, Socket } from "socket.io";
import express, { Express, Request, Response } from "express";
import idGenerator from "../helpers/id-generator";

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle: NextApiHandler = app.getRequestHandler();

app.prepare().then(async () => {
  const expressApp: Express = express();
  const server: nextServer = createServer(expressApp);
  const io: socketioServer = new socketioServer();

  io.attach(server);

  expressApp.get("/socket", async (_: Request, res: Response) => {
    res.send("hello world");
  });

  io.on("connection", (socket: Socket) => {
    socket.on("join", (roomId) => {
      socket.join(roomId);
      console.log("joined room!");
    });
    socket.on("message", (data) => {
      console.log(data);
      io.to(data.roomId).emit("message", {
        message: data.message,
        username: data.username,
        id: `${data.username}-${idGenerator()}`
      });
    });
  });

  expressApp.all("*", (req: NextApiRequest, res: any) => handle(req, res));
  server.listen(port);

  // tslint:disable-next-line:no-console
  console.log(
    `> Server listening at http://localhost:${port} as ${
      dev ? "development" : process.env.NODE_ENV
    }`
  );
});
