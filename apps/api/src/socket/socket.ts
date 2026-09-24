import type { Server as HttpServer } from "http";

import {
  Server as SocketIOServer,
} from "socket.io";

import {
  socketAuthMiddleware,
} from "./socket.middleware";

import type {
  AuthenticatedSocket,
} from "./socket.middleware";

import {
  registerVideoCallSocket,
} from "../modules/mentorship/video-call/videoCall.socket";

// ======================================================
// INITIALIZE SOCKET.IO
// ======================================================

export const initializeSocket = (
  httpServer: HttpServer
) => {

  const io =
    new SocketIOServer(
      httpServer,
      {
        cors: {
          origin: true,
          credentials: true,
        },
      }
    );

  // ====================================================
  // SOCKET AUTHENTICATION
  // ====================================================

  io.use(
    socketAuthMiddleware
  );

  // ====================================================
  // CONNECTION
  // ====================================================

  io.on(
    "connection",
    (socket) => {

      const authenticatedSocket =
        socket as AuthenticatedSocket;

      console.log(
        `[Socket] Connected: ${authenticatedSocket.userId}`
      );

      console.log(
        `[Socket] Socket ID: ${authenticatedSocket.id}`
      );

      console.log(
        `[Socket] Role: ${authenticatedSocket.role}`
      );

      // ================================================
      // DISCONNECT
      // ================================================

      socket.on(
        "disconnect",
        (reason) => {

          console.log(
            `[Socket] Disconnected: ${authenticatedSocket.userId}`,
            reason
          );

        }
      );

    }
  );

  // ====================================================
  // VIDEO CALL SOCKET EVENTS
  // ====================================================

  registerVideoCallSocket(io);

  // ====================================================
  // SOCKET.IO READY
  // ====================================================

  console.log(
    "[Socket] Socket.IO initialized"
  );

  return io;
};