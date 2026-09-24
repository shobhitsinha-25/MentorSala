import dotenv from "dotenv";
dotenv.config();

import http from "http";

import app from "./app";

import {
  initializeSocket,
} from "./socket/socket";

// ======================================================
// PORT
// ======================================================

const PORT =
  process.env.PORT || 5000;

// ======================================================
// HTTP SERVER
// ======================================================

const httpServer =
  http.createServer(app);

// ======================================================
// SOCKET.IO
// ======================================================

initializeSocket(
  httpServer
);

// ======================================================
// START SERVER
// ======================================================

httpServer.listen(
  PORT,
  () => {

    console.log(
      `Server running on port ${PORT}`
    );

  }
);