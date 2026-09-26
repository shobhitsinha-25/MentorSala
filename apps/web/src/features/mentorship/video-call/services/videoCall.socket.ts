import { io, Socket } from "socket.io-client";

// ======================================================
// SOCKET URL
// ======================================================

const SOCKET_URL =
  import.meta.env.VITE_API_URL;

// ======================================================
// SOCKET INSTANCE
// ======================================================

let socket: Socket | null = null;

// ======================================================
// CONNECT SOCKET
// ======================================================

export const connectSocket = (): Socket => {
  // ----------------------------------------------------
  // SOCKET ALREADY EXISTS
  // ----------------------------------------------------
  //
  // Even if socket.connected === false, return the
  // existing socket if it is currently connecting.
  //
  // This prevents React StrictMode from creating
  // multiple Socket.IO connections.
  // ----------------------------------------------------

  if (socket) {
    return socket;
  }

  // ----------------------------------------------------
  // CREATE SOCKET
  // ----------------------------------------------------

  console.log(
    "[Socket] Creating socket connection..."
  );

  socket = io(SOCKET_URL, {
    /**
     * Authentication is handled through the
     * HTTP-only authentication cookie.
     *
     * Do NOT try to read the token from localStorage.
     */
    withCredentials: true,

    autoConnect: true,

    transports: [
      "websocket",
      "polling",
    ],
  });

  // ----------------------------------------------------
  // CONNECTED
  // ----------------------------------------------------

  socket.on("connect", () => {
    console.log(
      "[Socket] Connected:",
      socket?.id
    );
  });

  // ----------------------------------------------------
  // CONNECTION ERROR
  // ----------------------------------------------------

  socket.on(
    "connect_error",
    (error) => {
      console.error(
        "[Socket] Connection error:",
        error.message
      );

      console.error(
        "[Socket] Connection error details:",
        error
      );
    }
  );

  // ----------------------------------------------------
  // DISCONNECTED
  // ----------------------------------------------------

  socket.on(
    "disconnect",
    (reason) => {
      console.log(
        "[Socket] Disconnected:",
        reason
      );
    }
  );

  return socket;
};

// ======================================================
// GET CURRENT SOCKET
// ======================================================

export const getSocket =
  (): Socket | null => {
    return socket;
  };

// ======================================================
// DISCONNECT SOCKET
// ======================================================

export const disconnectSocket =
  (): void => {
    if (!socket) {
      return;
    }

    console.log(
      "[Socket] Disconnecting:",
      socket.id
    );

    socket.disconnect();

    socket = null;
  };

// ======================================================
// JOIN SESSION RESPONSE
// ======================================================

type JoinMentorshipSessionResponse = {
  success: boolean;

  message?: string;

  data?: {
    sessionId: string;

    userId: string;

    role:
      | "STUDENT"
      | "MENTOR";

    scheduledAt: string;

    duration: number;

    remainingSeconds: number;

    participantCount: number;
  };
};

// ======================================================
// JOIN MENTORSHIP SESSION
// ======================================================

export const joinMentorshipSession = (
  sessionId: string
): Promise<JoinMentorshipSessionResponse> => {
  if (!socket) {
    throw new Error(
      "Socket is not connected."
    );
  }

  return new Promise(
    (resolve) => {
      socket!.emit(
        "join-session",
        sessionId,
        (
          response: JoinMentorshipSessionResponse
        ) => {
          console.log(
            "[Socket] Join session response:",
            response
          );

          resolve(response);
        }
      );
    }
  );
};

// ======================================================
// LEAVE MENTORSHIP SESSION
// ======================================================

export const leaveMentorshipSession = (
  sessionId: string
): void => {
  if (!socket) {
    return;
  }

  console.log(
    "[Socket] Leaving mentorship session:",
    sessionId
  );

  socket.emit(
    "leave-session",
    sessionId
  );
};