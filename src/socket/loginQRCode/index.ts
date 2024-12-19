import { Server, Socket } from "socket.io";
import { ILoginQRCode } from "../../types";
import TokenService from "../../services/tokens";

export const loginQRChannelHandler = (io: Server, socket: Socket) => {
  console.log(`Client connected to login QR code: ${socket.id}`);

  // Listen scan QR code
  socket.on("LOGIN_QR_CODE", async (data: ILoginQRCode) => {
    try {
      // Send event confirm login in another device
      io.to(data.currentSocketID).emit("CONFIRM_LOGIN_QR_CODE", {
        deviceInformation: data.deviceInformation,
      });
    } catch (error) {
      io.to(data.currentSocketID).emit("ERROR_LOGIN_QR_CODE", {
        message: "Your token is invalid",
      });
    }
  });

  // Listen Confirm login
  socket.on("CONFIRMED_LOGIN_IN_ANOTHER_DEVICE", async (data) => {
    const tokenDoc = await TokenService.verifyToken(data.accessToken);
    const tokens = await TokenService.generateAuthTokens(tokenDoc?.userId);
    // Generate and send tokens to new device
    io.to(data.targetSocketID).emit("LOGIN_QR_CODE_SUCCESS", {
      tokens,
    });
  });

  // Handle "disconnect" event
  socket.on("disconnect", () => {
    console.log(`Client disconnected from chat: ${socket.id}`);
  });
};
