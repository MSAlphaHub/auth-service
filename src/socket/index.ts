import { Server } from "socket.io";
import { Server as HTTPServer } from "http";
import { loginQRChannelHandler } from "./loginQRCode";
class SocketConnection {
  public static io: Server;

  constructor(server: HTTPServer) {
    SocketConnection.io = new Server(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true,
      },
    });
    this.initializeHandlers();
  }

  private initializeHandlers(): void {
    SocketConnection.io.on("connection", (socket) => {
      console.log(`Client connected: ${socket.id}`);
      loginQRChannelHandler(SocketConnection.io, socket);
    });
  }
}

export default SocketConnection;
