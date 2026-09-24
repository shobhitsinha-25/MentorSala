import type { Server } from "socket.io";

import type { AuthenticatedSocket } from "../../../socket/socket.middleware";
import { authorizeVideoCallJoin } from "./videoCall.service";

const getRoomName = (sessionId: string): string => {
  return `mentorship-session:${sessionId}`;
};

type JoinSessionResponse = {
  success: boolean;
  message?: string;
  data?: {
    sessionId: string;
    userId: string;
    role: "STUDENT" | "MENTOR";
    scheduledAt: Date;
    duration: number;
    remainingSeconds: number;
    participantCount: number;
  };
};

export const registerVideoCallSocket = (io: Server) => {
  io.on("connection", (socket) => {
    const authenticatedSocket = socket as AuthenticatedSocket;

    /**
     * =========================================================
     * JOIN SESSION
     * =========================================================
     */
    socket.on(
      "join-session",
      async (
        sessionId: string,
        callback?: (response: JoinSessionResponse) => void
      ) => {
        try {
          if (!sessionId || typeof sessionId !== "string") {
            throw new Error("Invalid session ID.");
          }

          const result = await authorizeVideoCallJoin(
            sessionId,
            authenticatedSocket.userId
          );

          const roomName = getRoomName(sessionId);

          await socket.join(roomName);

          const room = io.sockets.adapter.rooms.get(roomName);

          const participantCount = room?.size ?? 0;

          /**
           * Notify existing participant that someone joined.
           */
          socket.to(roomName).emit("participant-joined", {
            userId: authenticatedSocket.userId,
            role: authenticatedSocket.role,
          });

          callback?.({
            success: true,
            data: {
              ...result,
              participantCount,
            },
          });

          console.log(
            `[VideoCall] ${authenticatedSocket.userId} joined ${roomName}`
          );
        } catch (error) {
          const message =
            error instanceof Error
              ? error.message
              : "Unable to join mentorship session.";

          console.error(
            `[VideoCall] Join failed for ${authenticatedSocket.userId}:`,
            message
          );

          callback?.({
            success: false,
            message,
          });
        }
      }
    );

    /**
     * =========================================================
     * LEAVE SESSION
     * =========================================================
     */
    socket.on("leave-session", async (sessionId: string) => {
      try {
        if (!sessionId || typeof sessionId !== "string") {
          return;
        }

        const roomName = getRoomName(sessionId);

        if (!socket.rooms.has(roomName)) {
          return;
        }

        await socket.leave(roomName);

        socket.to(roomName).emit("participant-left", {
          userId: authenticatedSocket.userId,
          role: authenticatedSocket.role,
        });

        console.log(
          `[VideoCall] ${authenticatedSocket.userId} left ${roomName}`
        );
      } catch (error) {
        console.error("[VideoCall] Leave failed:", error);
      }
    });

    /**
     * =========================================================
     * WEBRTC OFFER
     * =========================================================
     *
     * Student creates an offer.
     *
     * Backend does NOT inspect or modify SDP.
     * It only forwards the offer to the other participant.
     */
    socket.on(
      "webrtc-offer",
      (data: {
        sessionId: string;
        offer: RTCSessionDescriptionInit;
      }) => {
        try {
          if (!data?.sessionId || !data?.offer) {
            return;
          }

          const roomName = getRoomName(data.sessionId);

          if (!socket.rooms.has(roomName)) {
            console.warn(
              `[WebRTC] Offer rejected: ${authenticatedSocket.userId} is not in ${roomName}`
            );

            return;
          }

          socket.to(roomName).emit("webrtc-offer", {
            userId: authenticatedSocket.userId,
            offer: data.offer,
          });

          console.log(
            `[WebRTC] Offer forwarded by ${authenticatedSocket.userId}`
          );
        } catch (error) {
          console.error("[WebRTC] Offer forwarding failed:", error);
        }
      }
    );

    /**
     * =========================================================
     * WEBRTC ANSWER
     * =========================================================
     *
     * Mentor receives the offer and sends an answer.
     */
    socket.on(
      "webrtc-answer",
      (data: {
        sessionId: string;
        answer: RTCSessionDescriptionInit;
      }) => {
        try {
          if (!data?.sessionId || !data?.answer) {
            return;
          }

          const roomName = getRoomName(data.sessionId);

          if (!socket.rooms.has(roomName)) {
            console.warn(
              `[WebRTC] Answer rejected: ${authenticatedSocket.userId} is not in ${roomName}`
            );

            return;
          }

          socket.to(roomName).emit("webrtc-answer", {
            userId: authenticatedSocket.userId,
            answer: data.answer,
          });

          console.log(
            `[WebRTC] Answer forwarded by ${authenticatedSocket.userId}`
          );
        } catch (error) {
          console.error("[WebRTC] Answer forwarding failed:", error);
        }
      }
    );

    /**
     * =========================================================
     * ICE CANDIDATE
     * =========================================================
     *
     * ICE candidates are exchanged through Socket.IO.
     */
    socket.on(
      "webrtc-ice-candidate",
      (data: {
        sessionId: string;
        candidate: RTCIceCandidateInit;
      }) => {
        try {
          if (!data?.sessionId || !data?.candidate) {
            return;
          }

          const roomName = getRoomName(data.sessionId);

          if (!socket.rooms.has(roomName)) {
            console.warn(
              `[WebRTC] ICE candidate rejected: ${authenticatedSocket.userId} is not in ${roomName}`
            );

            return;
          }

          socket.to(roomName).emit("webrtc-ice-candidate", {
            userId: authenticatedSocket.userId,
            candidate: data.candidate,
          });
        } catch (error) {
          console.error(
            "[WebRTC] ICE candidate forwarding failed:",
            error
          );
        }
      }
    );

    /**
     * =========================================================
     * DISCONNECT
     * =========================================================
     */
    socket.on("disconnect", () => {
      console.log(
        `[VideoCall] Socket disconnected: ${authenticatedSocket.userId}`
      );
    });
  });
};