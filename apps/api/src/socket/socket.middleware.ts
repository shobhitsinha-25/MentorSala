import type { Socket } from "socket.io";
import jwt from "jsonwebtoken";

import { Role } from "@prisma/client";

// ======================================================
// JWT PAYLOAD
// ======================================================

interface JwtPayload {
  userId: string;
  role: Role;
}

// ======================================================
// AUTHENTICATED SOCKET
// ======================================================

export interface AuthenticatedSocket extends Socket {
  userId: string;
  role: Role;
}

// ======================================================
// COOKIE HELPER
// ======================================================

const getCookieValue = (
  cookieHeader: string | undefined,
  cookieName: string
): string | undefined => {
  if (!cookieHeader) {
    return undefined;
  }

  const cookies = cookieHeader
    .split(";")
    .map((cookie) => cookie.trim());

  for (const cookie of cookies) {
    const separatorIndex = cookie.indexOf("=");

    if (separatorIndex === -1) {
      continue;
    }

    const name = cookie.slice(
      0,
      separatorIndex
    );

    const value = cookie.slice(
      separatorIndex + 1
    );

    if (name === cookieName) {
      return decodeURIComponent(value);
    }
  }

  return undefined;
};

// ======================================================
// SOCKET AUTHENTICATION
// ======================================================

export const socketAuthMiddleware = (
  socket: Socket,
  next: (err?: Error) => void
) => {
  try {
    // ==================================================
    // GET TOKEN FROM SOCKET AUTH
    // ==================================================

    let token =
      socket.handshake.auth?.token ||
      socket.handshake.headers.authorization?.replace(
        "Bearer ",
        ""
      );

    // ==================================================
    // FALLBACK: GET TOKEN FROM COOKIE
    // ==================================================

    if (!token) {
      const cookieHeader =
        socket.handshake.headers.cookie;

      token = getCookieValue(
        cookieHeader,
        "accessToken"
      );
    }

    // ==================================================
    // TOKEN REQUIRED
    // ==================================================

    if (!token) {
      return next(
        new Error(
          "Authentication required"
        )
      );
    }

    // ==================================================
    // JWT SECRET
    // ==================================================

    const jwtSecret =
      process.env.JWT_SECRET;

    if (!jwtSecret) {
      console.error(
        "JWT_SECRET is not configured"
      );

      return next(
        new Error(
          "Server authentication configuration error"
        )
      );
    }

    // ==================================================
    // VERIFY TOKEN
    // ==================================================

    const decoded =
      jwt.verify(
        token,
        jwtSecret
      ) as JwtPayload;

    // ==================================================
    // VALIDATE PAYLOAD
    // ==================================================

    if (
      !decoded.userId ||
      !decoded.role
    ) {
      return next(
        new Error(
          "Invalid authentication token"
        )
      );
    }

    // ==================================================
    // ATTACH USER
    // ==================================================

    const authenticatedSocket =
      socket as AuthenticatedSocket;

    authenticatedSocket.userId =
      decoded.userId;

    authenticatedSocket.role =
      decoded.role;

    // ==================================================
    // SUCCESS
    // ==================================================

    next();

  } catch (error) {
    console.error(
      "Socket authentication failed:",
      error
    );

    return next(
      new Error(
        "Invalid or expired authentication token"
      )
    );
  }
};