import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  ArrowLeft,
  Clock,
  Mic,
  MicOff,
  PhoneOff,
  ShieldCheck,
  User,
  Users,
  Video,
  VideoOff,
} from "lucide-react";

import type { Socket } from "socket.io-client";

import {
  connectSocket,
  joinMentorshipSession,
  leaveMentorshipSession,
} from "../services/videoCall.socket";

import { WebRTCService } from "../services/webrtc.service";

import {
  getTwilioIceServers,
} from "../services/videoCall.api";

// ======================================================
// TYPES
// ======================================================

type CallStatus =
  | "CONNECTING"
  | "JOINED"
  | "ERROR";

type UserRole =
  | "STUDENT"
  | "MENTOR"
  | null;

// ======================================================
// COMPONENT
// ======================================================

const VideoCall = () => {
  const { sessionId } =
    useParams<{ sessionId: string }>();

  const navigate = useNavigate();

  // ======================================================
  // REFS
  // ======================================================

  const localVideoRef =
    useRef<HTMLVideoElement | null>(null);

  const remoteVideoRef =
    useRef<HTMLVideoElement | null>(null);

  const socketRef =
    useRef<Socket | null>(null);

  const webRTCServiceRef =
    useRef<WebRTCService | null>(null);

  const localStreamRef =
    useRef<MediaStream | null>(null);

  const roleRef =
    useRef<UserRole>(null);

  const offerCreatedRef =
    useRef(false);

  const iceServersRef =
    useRef<RTCIceServer[]>([]);

  const joinedRoomRef =
    useRef(false);

  const initializationIdRef =
    useRef(0);

  // ======================================================
  // SESSION STATE
  // ======================================================

  const [status, setStatus] =
    useState<CallStatus>("CONNECTING");

  const [error, setError] =
    useState<string | null>(null);

  const [role, setRole] =
    useState<UserRole>(null);

  const [participantCount, setParticipantCount] =
    useState(0);

  const [remainingSeconds, setRemainingSeconds] =
    useState(0);

  // ======================================================
  // MEDIA STATE
  // ======================================================

  const [localStream, setLocalStream] =
    useState<MediaStream | null>(null);

  const [remoteStream, setRemoteStream] =
    useState<MediaStream | null>(null);

  const [mediaError, setMediaError] =
    useState<string | null>(null);

  const [isMuted, setIsMuted] =
    useState(false);

  const [isVideoEnabled, setIsVideoEnabled] =
    useState(true);

  // ======================================================
  // WEBRTC STATE
  // ======================================================

  const [
    webRTCConnectionState,
    setWebRTCConnectionState,
  ] = useState<RTCPeerConnectionState>("new");

  // ======================================================
  // INITIALIZATION VALIDATION
  // ======================================================

  const isInitializationActive = (
    initializationId: number
  ): boolean => {
    return (
      initializationIdRef.current ===
      initializationId
    );
  };

  // ======================================================
  // STOP MEDIA STREAM
  // ======================================================

  const stopMediaStream = (
    stream: MediaStream | null
  ): void => {
    if (!stream) {
      return;
    }

    stream.getTracks().forEach((track) => {
      track.stop();
    });
  };

  // ======================================================
  // ATTACH LOCAL VIDEO
  //
  // IMPORTANT:
  // Callback ref is used instead of relying only on
  // useEffect + useRef.
  //
  // This guarantees that the stream is attached when
  // the actual <video> DOM element exists.
  // ======================================================

  const attachLocalVideo = useCallback(
    (element: HTMLVideoElement | null) => {
      localVideoRef.current = element;

      if (!element) {
        console.log(
          "[VideoCall] Local video element unmounted."
        );

        return;
      }

      const stream =
        localStreamRef.current;

      console.log(
        "[VideoCall] Local video element mounted:",
        {
          hasStream: !!stream,
          videoTracks:
            stream?.getVideoTracks().length ?? 0,
          audioTracks:
            stream?.getAudioTracks().length ?? 0,
        }
      );

      if (!stream) {
        return;
      }

      console.log(
        "[VideoCall] Attaching local stream to video element."
      );

      element.srcObject = stream;

      element.muted = true;
      element.autoplay = true;
      element.playsInline = true;

      void element
        .play()
        .then(() => {
          console.log(
            "[VideoCall] Local video playback started."
          );
        })
        .catch((playError) => {
          console.error(
            "[VideoCall] Local video playback failed:",
            playError
          );
        });
    },
    []
  );

  // ======================================================
  // START LOCAL MEDIA
  // ======================================================

  const startLocalMedia =
    async (): Promise<MediaStream | null> => {
      try {
        console.log(
          "[VideoCall] Requesting camera and microphone..."
        );

        setMediaError(null);

        if (
          !navigator.mediaDevices ||
          !navigator.mediaDevices.getUserMedia
        ) {
          throw new Error(
            "Camera and microphone are not supported by this browser."
          );
        }

        const stream =
          await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
          });

        console.log(
          "[VideoCall] Local media acquired:",
          {
            videoTracks:
              stream.getVideoTracks().map(
                (track) => ({
                  id: track.id,
                  enabled: track.enabled,
                  readyState: track.readyState,
                })
              ),
            audioTracks:
              stream.getAudioTracks().map(
                (track) => ({
                  id: track.id,
                  enabled: track.enabled,
                  readyState: track.readyState,
                })
              ),
          }
        );

        localStreamRef.current =
          stream;

        setLocalStream(stream);

        // If the video element already exists,
        // attach immediately.
        const videoElement =
          localVideoRef.current;

        if (videoElement) {
          console.log(
            "[VideoCall] Video element already exists. Attaching stream immediately."
          );

          videoElement.srcObject =
            stream;

          videoElement.muted = true;
          videoElement.autoplay = true;
          videoElement.playsInline = true;

          void videoElement
            .play()
            .then(() => {
              console.log(
                "[VideoCall] Local video playback started after media acquisition."
              );
            })
            .catch((playError) => {
              console.error(
                "[VideoCall] Local video playback failed:",
                playError
              );
            });
        }

        return stream;
      } catch (error) {
        console.error(
          "[VideoCall] Failed to access camera/microphone:",
          error
        );

        if (
          error instanceof DOMException
        ) {
          if (
            error.name ===
            "NotAllowedError"
          ) {
            setMediaError(
              "Camera and microphone permission was denied. Please allow access from your browser settings."
            );
          } else if (
            error.name ===
            "NotFoundError"
          ) {
            setMediaError(
              "No camera or microphone was found on this device."
            );
          } else if (
            error.name ===
            "NotReadableError"
          ) {
            setMediaError(
              "Your camera or microphone is already being used by another application."
            );
          } else {
            setMediaError(
              "Unable to access your camera or microphone."
            );
          }
        } else {
          setMediaError(
            error instanceof Error
              ? error.message
              : "Unable to access your camera or microphone."
          );
        }

        return null;
      }
    };

  // ======================================================
  // CREATE WEBRTC SERVICE
  // ======================================================

  const createWebRTCService = (
    socket: Socket,
    stream: MediaStream,
    iceServers: RTCIceServer[]
  ): WebRTCService => {
    if (
      webRTCServiceRef.current
    ) {
      return webRTCServiceRef.current;
    }

    console.log(
      "[VideoCall] Creating WebRTC service..."
    );

    const service =
      new WebRTCService({
        socket,
        sessionId: sessionId as string,
        localStream: stream,
        iceServers,

        onRemoteStream: (
          incomingStream
        ) => {
          console.log(
            "[VideoCall] Remote stream received.",
            {
              videoTracks:
                incomingStream.getVideoTracks()
                  .length,
              audioTracks:
                incomingStream.getAudioTracks()
                  .length,
            }
          );

          setRemoteStream(
            incomingStream
          );
        },

        onConnectionStateChange: (
          connectionState
        ) => {
          console.log(
            "[VideoCall] WebRTC connection state:",
            connectionState
          );

          setWebRTCConnectionState(
            connectionState
          );
        },
      });

    webRTCServiceRef.current =
      service;

    return service;
  };

  // ======================================================
  // CREATE MENTOR OFFER
  // ======================================================

  const createMentorOffer =
    async (): Promise<void> => {
      if (!sessionId) {
        return;
      }

      if (
        roleRef.current !==
        "MENTOR"
      ) {
        return;
      }

      if (
        offerCreatedRef.current
      ) {
        console.log(
          "[VideoCall] Offer already created."
        );

        return;
      }

      const service =
        webRTCServiceRef.current;

      if (!service) {
        console.warn(
          "[VideoCall] WebRTC service not ready."
        );

        return;
      }

      try {
        offerCreatedRef.current =
          true;

        console.log(
          "[VideoCall] Mentor creating WebRTC offer..."
        );

        await service.createOffer();

        console.log(
          "[VideoCall] Mentor offer created successfully."
        );
      } catch (error) {
        offerCreatedRef.current =
          false;

        console.error(
          "[VideoCall] Failed to create WebRTC offer:",
          error
        );
      }
    };

  // ======================================================
  // JOIN SESSION
  // ======================================================

  useEffect(() => {
    if (!sessionId) {
      setError(
        "Invalid mentorship session."
      );

      setStatus("ERROR");

      return;
    }

    const initializationId =
      initializationIdRef.current + 1;

    initializationIdRef.current =
      initializationId;

    let mounted = true;

    let currentSocket:
      | Socket
      | null = null;

    // ----------------------------------------------------
    // PARTICIPANT JOINED
    // ----------------------------------------------------

    const handleParticipantJoined = (
      data: {
        userId: string;
        role:
          | "STUDENT"
          | "MENTOR";
      }
    ) => {
      if (
        !mounted ||
        !isInitializationActive(
          initializationId
        )
      ) {
        return;
      }

      console.log(
        "[VideoCall] Participant joined:",
        data
      );

      setParticipantCount(2);

      const stream =
        localStreamRef.current;

      if (
        stream &&
        currentSocket &&
        !webRTCServiceRef.current
      ) {
        createWebRTCService(
          currentSocket,
          stream,
          iceServersRef.current
        );
      }

      if (
        roleRef.current ===
        "MENTOR"
      ) {
        void createMentorOffer();
      }
    };

    // ----------------------------------------------------
    // PARTICIPANT LEFT
    // ----------------------------------------------------

    const handleParticipantLeft = (
      data: {
        userId: string;
        role:
          | "STUDENT"
          | "MENTOR";
      }
    ) => {
      if (
        !mounted ||
        !isInitializationActive(
          initializationId
        )
      ) {
        return;
      }

      console.log(
        "[VideoCall] Participant left:",
        data
      );

      setParticipantCount(1);

      setRemoteStream(null);

      if (
        remoteVideoRef.current
      ) {
        remoteVideoRef.current.srcObject =
          null;
      }

      if (
        webRTCServiceRef.current
      ) {
        console.log(
          "[VideoCall] Destroying WebRTC connection after participant left."
        );

        webRTCServiceRef.current.destroy();

        webRTCServiceRef.current =
          null;
      }

      offerCreatedRef.current =
        false;

      setWebRTCConnectionState(
        "new"
      );
    };

    // ----------------------------------------------------
    // JOIN
    // ----------------------------------------------------

    const joinSession =
      async () => {
        let acquiredStream:
          | MediaStream
          | null = null;

        try {
          console.log(
            "[VideoCall] Starting join..."
          );

          setStatus(
            "CONNECTING"
          );

          setError(null);

          if (
            !mounted ||
            !isInitializationActive(
              initializationId
            )
          ) {
            return;
          }

          const socket =
            connectSocket();

          currentSocket =
            socket;

          socketRef.current =
            socket;

          console.log(
            "[VideoCall] Socket:",
            socket.id
          );

          console.log(
            "[VideoCall] Socket connected:",
            socket.connected
          );

          socket.on(
            "participant-joined",
            handleParticipantJoined
          );

          socket.on(
            "participant-left",
            handleParticipantLeft
          );

          if (!socket.connected) {
            console.log(
              "[VideoCall] Waiting for socket connection..."
            );

            await new Promise<void>(
              (
                resolve,
                reject
              ) => {
                let settled =
                  false;

                const handleConnect =
                  () => {
                    if (
                      settled
                    ) {
                      return;
                    }

                    settled =
                      true;

                    console.log(
                      "[VideoCall] Socket connected:",
                      socket.id
                    );

                    cleanup();

                    resolve();
                  };

                const handleError =
                  (
                    connectionError: Error
                  ) => {
                    if (
                      settled
                    ) {
                      return;
                    }

                    settled =
                      true;

                    console.error(
                      "[VideoCall] Socket connection failed:",
                      connectionError
                    );

                    cleanup();

                    reject(
                      connectionError
                    );
                  };

                const cleanup =
                  () => {
                    socket.off(
                      "connect",
                      handleConnect
                    );

                    socket.off(
                      "connect_error",
                      handleError
                    );
                  };

                socket.once(
                  "connect",
                  handleConnect
                );

                socket.once(
                  "connect_error",
                  handleError
                );
              }
            );
          }

          if (
            !mounted ||
            !isInitializationActive(
              initializationId
            )
          ) {
            return;
          }

          // ----------------------------------------------
          // CAMERA + MICROPHONE
          // ----------------------------------------------

          acquiredStream =
            await startLocalMedia();

          if (
            !mounted ||
            !isInitializationActive(
              initializationId
            )
          ) {
            stopMediaStream(
              acquiredStream
            );

            if (
              localStreamRef.current ===
              acquiredStream
            ) {
              localStreamRef.current =
                null;
            }

            return;
          }

          if (!acquiredStream) {
            throw new Error(
              "Camera and microphone are required to join the mentorship call."
            );
          }

          // ----------------------------------------------
          // ICE SERVERS
          // ----------------------------------------------

          console.log(
            "[VideoCall] Fetching Twilio ICE servers..."
          );

          const {
            iceServers,
            ttl,
          } =
            await getTwilioIceServers();

          if (
            !mounted ||
            !isInitializationActive(
              initializationId
            )
          ) {
            stopMediaStream(
              acquiredStream
            );

            if (
              localStreamRef.current ===
              acquiredStream
            ) {
              localStreamRef.current =
                null;
            }

            return;
          }

          if (
            !iceServers ||
            iceServers.length === 0
          ) {
            throw new Error(
              "Unable to initialize video call networking."
            );
          }

          iceServersRef.current =
            iceServers;

          console.log(
            `[VideoCall] Received ${iceServers.length} ICE servers from Twilio.`
          );

          console.log(
            `[VideoCall] Twilio ICE credentials TTL: ${ttl} seconds.`
          );

          // ----------------------------------------------
          // WEBRTC SERVICE
          // ----------------------------------------------

          createWebRTCService(
            socket,
            acquiredStream,
            iceServers
          );

          if (
            !mounted ||
            !isInitializationActive(
              initializationId
            )
          ) {
            if (
              webRTCServiceRef.current
            ) {
              webRTCServiceRef.current.destroy();

              webRTCServiceRef.current =
                null;
            }

            stopMediaStream(
              acquiredStream
            );

            if (
              localStreamRef.current ===
              acquiredStream
            ) {
              localStreamRef.current =
                null;
            }

            return;
          }

          // ----------------------------------------------
          // JOIN SERVER SESSION
          // ----------------------------------------------

          console.log(
            "[VideoCall] Sending join-session:",
            sessionId
          );

          const response =
            await joinMentorshipSession(
              sessionId
            );

          console.log(
            "[VideoCall] Join response:",
            response
          );

          if (
            !mounted ||
            !isInitializationActive(
              initializationId
            )
          ) {
            console.log(
              "[VideoCall] Initialization became stale after join response."
            );

            return;
          }

          if (
            !response.success ||
            !response.data
          ) {
            console.error(
              "[VideoCall] Join rejected:",
              response.message
            );

            setError(
              response.message ||
                "Unable to join the mentorship session."
            );

            setStatus(
              "ERROR"
            );

            return;
          }

          joinedRoomRef.current =
            true;

          const currentRole =
            response.data.role;

          roleRef.current =
            currentRole;

          setRole(
            currentRole
          );

          setParticipantCount(
            response.data
              .participantCount
          );

          setRemainingSeconds(
            response.data
              .remainingSeconds
          );

          console.log(
            "[VideoCall] Successfully joined session."
          );

          // ----------------------------------------------
          // MENTOR CREATES OFFER
          // ----------------------------------------------

          if (
            currentRole ===
              "MENTOR" &&
            response.data
              .participantCount >= 2
          ) {
            await Promise.resolve();

            if (
              !mounted ||
              !isInitializationActive(
                initializationId
              )
            ) {
              return;
            }

            await createMentorOffer();
          }

          if (
            !mounted ||
            !isInitializationActive(
              initializationId
            )
          ) {
            return;
          }

          setStatus(
            "JOINED"
          );
        } catch (err) {
          if (
            !mounted ||
            !isInitializationActive(
              initializationId
            )
          ) {
            return;
          }

          console.error(
            "[VideoCall] Failed to join:",
            err
          );

          setError(
            err instanceof Error
              ? err.message
              : "Unable to join the mentorship session."
          );

          const failedStream =
            localStreamRef.current;

          if (failedStream) {
            stopMediaStream(
              failedStream
            );

            localStreamRef.current =
              null;

            setLocalStream(null);
          }

          if (
            webRTCServiceRef.current
          ) {
            webRTCServiceRef.current.destroy();

            webRTCServiceRef.current =
              null;
          }

          iceServersRef.current =
            [];

          setStatus(
            "ERROR"
          );
        }
      };

    void joinSession();

    return () => {
      mounted = false;

      initializationIdRef.current++;

      console.log(
        "[VideoCall] Cleaning up call."
      );

      if (currentSocket) {
        currentSocket.off(
          "participant-joined",
          handleParticipantJoined
        );

        currentSocket.off(
          "participant-left",
          handleParticipantLeft
        );
      }

      if (
        joinedRoomRef.current &&
        sessionId
      ) {
        leaveMentorshipSession(
          sessionId
        );

        joinedRoomRef.current =
          false;
      }

      if (
        webRTCServiceRef.current
      ) {
        console.log(
          "[VideoCall] Destroying WebRTC service."
        );

        webRTCServiceRef.current.destroy();

        webRTCServiceRef.current =
          null;
      }

      offerCreatedRef.current =
        false;

      iceServersRef.current =
        [];

      const stream =
        localStreamRef.current;

      if (stream) {
        stopMediaStream(
          stream
        );

        localStreamRef.current =
          null;
      }

      if (
        localVideoRef.current
      ) {
        localVideoRef.current.srcObject =
          null;
      }

      if (
        remoteVideoRef.current
      ) {
        remoteVideoRef.current.srcObject =
          null;
      }
    };
  }, [sessionId]);

  // ======================================================
  // KEEP LOCAL VIDEO ATTACHED
  //
  // This is a safety net.
  //
  // The callback ref above is the primary mechanism.
  // This effect handles cases where React re-renders while
  // the same video element remains mounted.
  // ======================================================

  useEffect(() => {
    const videoElement =
      localVideoRef.current;

    if (
      !videoElement ||
      !localStream
    ) {
      return;
    }

    console.log(
      "[VideoCall] Re-attaching local video stream."
    );

    if (
      videoElement.srcObject !==
      localStream
    ) {
      videoElement.srcObject =
        localStream;
    }

    videoElement.muted = true;
    videoElement.autoplay = true;
    videoElement.playsInline = true;

    void videoElement
      .play()
      .then(() => {
        console.log(
          "[VideoCall] Local video playback confirmed."
        );
      })
      .catch((playError) => {
        console.error(
          "[VideoCall] Local video playback failed:",
          playError
        );
      });

    return () => {
      // IMPORTANT:
      // Do NOT clear srcObject here.
      //
      // Clearing it during a render/effect transition can
      // cause the local preview to disappear.
    };
  }, [localStream]);

  // ======================================================
  // ATTACH REMOTE VIDEO STREAM
  // ======================================================

  useEffect(() => {
    const videoElement =
      remoteVideoRef.current;

    if (
      !videoElement ||
      !remoteStream
    ) {
      return;
    }

    console.log(
      "[VideoCall] Attaching remote video stream."
    );

    videoElement.srcObject =
      remoteStream;

    videoElement.autoplay = true;
    videoElement.playsInline = true;

    void videoElement
      .play()
      .catch((error) => {
        console.error(
          "[VideoCall] Remote video playback failed:",
          error
        );
      });

    return () => {
      if (
        remoteVideoRef.current ===
        videoElement
      ) {
        videoElement.srcObject =
          null;
      }
    };
  }, [remoteStream]);

  // ======================================================
  // STOP LOCAL MEDIA ON UNMOUNT
  // ======================================================

  useEffect(() => {
    return () => {
      const stream =
        localStreamRef.current;

      if (!stream) {
        return;
      }

      console.log(
        "[VideoCall] Stopping local media."
      );

      stopMediaStream(
        stream
      );

      localStreamRef.current =
        null;
    };
  }, []);

  // ======================================================
  // SESSION COUNTDOWN
  // ======================================================

  useEffect(() => {
    if (
      status !== "JOINED"
    ) {
      return;
    }

    const interval =
      window.setInterval(() => {
        setRemainingSeconds(
          (previous) => {
            if (
              previous <= 1
            ) {
              window.clearInterval(
                interval
              );

              return 0;
            }

            return previous - 1;
          }
        );
      }, 1000);

    return () => {
      window.clearInterval(
        interval
      );
    };
  }, [status]);

  // ======================================================
  // SESSION ENDED
  // ======================================================

  useEffect(() => {
    if (
      remainingSeconds !== 0 ||
      status !== "JOINED"
    ) {
      return;
    }

    console.log(
      "[VideoCall] Session ended."
    );

    if (sessionId) {
      leaveMentorshipSession(
        sessionId
      );

      joinedRoomRef.current =
        false;
    }

    if (
      webRTCServiceRef.current
    ) {
      webRTCServiceRef.current.destroy();

      webRTCServiceRef.current =
        null;
    }

    offerCreatedRef.current =
      false;

    iceServersRef.current =
      [];

    const stream =
      localStreamRef.current;

    if (stream) {
      stopMediaStream(
        stream
      );

      localStreamRef.current =
        null;

      setLocalStream(null);
    }

    setRemoteStream(null);

    if (
      localVideoRef.current
    ) {
      localVideoRef.current.srcObject =
        null;
    }

    if (
      remoteVideoRef.current
    ) {
      remoteVideoRef.current.srcObject =
        null;
    }

    setStatus(
      "ERROR"
    );

    setError(
      "This mentorship session has ended."
    );
  }, [
    remainingSeconds,
    status,
    sessionId,
  ]);

  // ======================================================
  // FORMAT TIMER
  // ======================================================

  const formatTime = (
    seconds: number
  ): string => {
    const minutes =
      Math.floor(
        seconds / 60
      );

    const remaining =
      seconds % 60;

    return `${String(
      minutes
    ).padStart(
      2,
      "0"
    )}:${String(
      remaining
    ).padStart(
      2,
      "0"
    )}`;
  };

  // ======================================================
  // TOGGLE MICROPHONE
  // ======================================================

  const toggleMute = () => {
    if (!localStream) {
      return;
    }

    const audioTracks =
      localStream.getAudioTracks();

    if (
      audioTracks.length === 0
    ) {
      return;
    }

    audioTracks.forEach(
      (track) => {
        track.enabled =
          !track.enabled;
      }
    );

    setIsMuted(
      !audioTracks[0].enabled
    );

    console.log(
      "[VideoCall] Microphone:",
      audioTracks[0].enabled
        ? "ON"
        : "OFF"
    );
  };

  // ======================================================
  // TOGGLE CAMERA
  // ======================================================

  const toggleVideo = () => {
    if (!localStream) {
      return;
    }

    const videoTracks =
      localStream.getVideoTracks();

    if (
      videoTracks.length === 0
    ) {
      return;
    }

    videoTracks.forEach(
      (track) => {
        track.enabled =
          !track.enabled;
      }
    );

    setIsVideoEnabled(
      videoTracks[0].enabled
    );

    console.log(
      "[VideoCall] Camera:",
      videoTracks[0].enabled
        ? "ON"
        : "OFF"
    );
  };

  // ======================================================
  // LEAVE CALL
  // ======================================================

  const handleLeave = () => {
    console.log(
      "[VideoCall] Leaving call."
    );

    if (sessionId) {
      leaveMentorshipSession(
        sessionId
      );

      joinedRoomRef.current =
        false;
    }

    if (
      webRTCServiceRef.current
    ) {
      webRTCServiceRef.current.destroy();

      webRTCServiceRef.current =
        null;
    }

    offerCreatedRef.current =
      false;

    iceServersRef.current =
      [];

    const stream =
      localStreamRef.current;

    if (stream) {
      stopMediaStream(
        stream
      );

      localStreamRef.current =
        null;

      setLocalStream(null);
    }

    setRemoteStream(null);

    if (
      localVideoRef.current
    ) {
      localVideoRef.current.srcObject =
        null;
    }

    if (
      remoteVideoRef.current
    ) {
      remoteVideoRef.current.srcObject =
        null;
    }

    navigate(-1);
  };

  // ======================================================
  // CONNECTING SCREEN
  // ======================================================

  if (
    status === "CONNECTING"
  ) {
    return (
      <div className="relative flex min-h-screen items-center justify-center bg-zinc-950 font-sans text-zinc-100 antialiased selection:bg-indigo-500/30">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]" />

        <div className="relative z-10 flex max-w-sm flex-col items-center px-6 text-center">
          <div className="relative mb-6 flex h-20 w-20 items-center justify-center">
            <div className="absolute inset-0 animate-ping rounded-full bg-indigo-500/20 duration-1000" />

            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/80 shadow-2xl shadow-indigo-500/10 backdrop-blur-xl">
              <div className="h-7 w-7 animate-spin rounded-full border-2 border-zinc-600 border-t-indigo-400" />
            </div>
          </div>

          <h2 className="text-xl font-semibold tracking-tight text-white">
            Connecting to Session
          </h2>

          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            Setting up encrypted WebRTC channel and optimizing audio/video feeds...
          </p>

          <div className="mt-6 flex items-center gap-2 rounded-full border border-zinc-800/80 bg-zinc-900/60 px-3.5 py-1.5 text-xs font-medium text-zinc-400 shadow-sm backdrop-blur-md">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>
              End-to-End Encrypted
            </span>
          </div>
        </div>
      </div>
    );
  }

  // ======================================================
  // ERROR SCREEN
  // ======================================================

  if (
    status === "ERROR"
  ) {
    return (
      <div className="relative flex min-h-screen items-center justify-center bg-zinc-950 px-4 font-sans text-zinc-100 antialiased selection:bg-red-500/30">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(239,68,68,0.1),rgba(255,255,255,0))]" />

        <div className="relative z-10 w-full max-w-md rounded-3xl border border-zinc-800/80 bg-zinc-900/90 p-8 shadow-2xl backdrop-blur-2xl">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10 text-red-400 shadow-inner">
            <PhoneOff
              size={28}
              className="stroke-[2.2]"
            />
          </div>

          <div className="text-center">
            <h1 className="text-xl font-semibold tracking-tight text-white">
              Call Disconnected
            </h1>

            <p className="mt-2.5 text-sm leading-relaxed text-zinc-400">
              {error}
            </p>
          </div>

          {mediaError && (
            <div className="mt-5 rounded-xl border border-red-500/30 bg-red-950/30 p-4 text-left text-xs leading-relaxed text-red-300">
              <span className="mb-0.5 block font-semibold text-red-200">
                Device Access Warning:
              </span>

              {mediaError}
            </div>
          )}

          <button
            type="button"
            onClick={() =>
              navigate(-1)
            }
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-zinc-950 shadow-md transition-all duration-150 hover:bg-zinc-200 active:scale-[0.98]"
          >
            <ArrowLeft size={18} />
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // ======================================================
  // VIDEO CALL UI
  // ======================================================

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-zinc-950 font-sans text-zinc-100 antialiased selection:bg-indigo-500/30">

      {/* ==================================================
          HEADER
      ================================================== */}

      <header className="relative z-20 flex h-16 shrink-0 items-center justify-between border-b border-zinc-800/80 bg-zinc-900/60 px-5 backdrop-blur-xl md:px-8">

        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-700/60 bg-zinc-800/80 text-zinc-300 shadow-sm">
            <User className="h-4 w-4" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-semibold tracking-tight text-zinc-100">
                Mentorship Session
              </h1>

              <span className="rounded-md border border-indigo-500/30 bg-indigo-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-indigo-300">
                {role ===
                "STUDENT"
                  ? "Student"
                  : "Mentor"}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <div className="flex items-center gap-1.5">
                <Users className="h-3 w-3 text-zinc-500" />

                <span>
                  {participantCount} / 2
                </span>
              </div>

              {participantCount >=
                2 && (
                <>
                  <span className="text-zinc-600">
                    •
                  </span>

                  <div className="flex items-center gap-1.5">
                    <span
                      className={`inline-block h-2 w-2 rounded-full ${
                        webRTCConnectionState ===
                        "connected"
                          ? "bg-emerald-400 ring-4 ring-emerald-400/20"
                          : webRTCConnectionState ===
                            "connecting"
                          ? "animate-pulse bg-amber-400 ring-4 ring-amber-400/20"
                          : "bg-zinc-500"
                      }`}
                    />

                    <span
                      className={`text-[11px] font-medium ${
                        webRTCConnectionState ===
                        "connected"
                          ? "text-emerald-400"
                          : webRTCConnectionState ===
                            "connecting"
                          ? "text-amber-400"
                          : "text-zinc-500"
                      }`}
                    >
                      {webRTCConnectionState ===
                      "connected"
                        ? "Encrypted Peer Link"
                        : webRTCConnectionState ===
                          "connecting"
                        ? "Negotiating..."
                        : "Waiting for stream"}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-950/70 px-3.5 py-1.5 shadow-inner">
          <Clock className="h-3.5 w-3.5 text-zinc-400" />

          <span className="font-mono text-xs font-medium tracking-widest text-zinc-200">
            {formatTime(
              remainingSeconds
            )}
          </span>
        </div>
      </header>

      {/* ==================================================
          MAIN
      ================================================== */}

      <main className="relative flex flex-1 flex-col items-center justify-center overflow-hidden p-3 sm:p-5 md:p-6">

        {mediaError && (
          <div className="mb-4 w-full max-w-5xl rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-2.5 text-xs text-amber-200 backdrop-blur-md">
            {mediaError}
          </div>
        )}

        <div className="grid h-full w-full max-w-7xl grid-cols-1 items-center justify-center gap-3 sm:gap-4 md:grid-cols-2">

          {/* ==================================================
              LOCAL TILE
          ================================================== */}

          <div className="group relative flex aspect-video h-full max-h-[480px] w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/90 shadow-2xl transition-all duration-300 sm:rounded-3xl md:max-h-[620px]">

            {localStream ? (
              <video
                ref={attachLocalVideo}
                autoPlay
                playsInline
                muted
                className="h-full w-full object-cover scale-x-[-1]"
              />
            ) : (
              <div className="flex flex-col items-center justify-center p-6 text-center">
                <div className="mb-3 flex h-20 w-20 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-950/60 shadow-xl">
                  <User className="h-8 w-8 text-zinc-400" />
                </div>

                <h3 className="text-sm font-medium text-zinc-200">
                  Camera Paused
                </h3>

                <p className="mt-1 text-xs text-zinc-500">
                  Enable your webcam to share video
                </p>
              </div>
            )}

            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3.5 sm:p-4">

              <div className="flex items-center gap-2 rounded-lg border border-zinc-800/80 bg-zinc-950/70 px-2.5 py-1 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

                <span className="text-xs font-medium text-zinc-200">
                  You (
                  {role ===
                  "STUDENT"
                    ? "Student"
                    : "Mentor"}
                  )
                </span>
              </div>

              <div className="flex items-center gap-1.5">

                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-lg border backdrop-blur-md ${
                    isMuted
                      ? "border-red-500/40 bg-red-500/20 text-red-400"
                      : "border-zinc-800/80 bg-zinc-950/70 text-zinc-300"
                  }`}
                >
                  {isMuted ? (
                    <MicOff size={13} />
                  ) : (
                    <Mic size={13} />
                  )}
                </div>

                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-lg border backdrop-blur-md ${
                    !isVideoEnabled
                      ? "border-red-500/40 bg-red-500/20 text-red-400"
                      : "border-zinc-800/80 bg-zinc-950/70 text-zinc-300"
                  }`}
                >
                  {isVideoEnabled ? (
                    <Video size={13} />
                  ) : (
                    <VideoOff size={13} />
                  )}
                </div>

              </div>
            </div>
          </div>

          {/* ==================================================
              REMOTE TILE
          ================================================== */}

          <div className="group relative flex aspect-video h-full max-h-[480px] w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/90 shadow-2xl transition-all duration-300 sm:rounded-3xl md:max-h-[620px]">

            {remoteStream ? (
              <>
                <video
                  ref={remoteVideoRef}
                  autoPlay
                  playsInline
                  className="h-full w-full object-cover"
                />

                <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3.5 sm:p-4">

                  <div className="flex items-center gap-2 rounded-lg border border-zinc-800/80 bg-zinc-950/70 px-2.5 py-1 backdrop-blur-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

                    <span className="text-xs font-medium text-zinc-200">
                      {role ===
                      "STUDENT"
                        ? "Mentor"
                        : "Student"}
                    </span>
                  </div>

                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center p-6 text-center">

                {participantCount >=
                2 ? (
                  <>
                    <div className="relative mb-4 flex h-16 w-16 items-center justify-center">
                      <div className="absolute inset-0 animate-ping rounded-2xl bg-indigo-500/10 duration-1000" />

                      <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-950/80">
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-zinc-600 border-t-indigo-400" />
                      </div>
                    </div>

                    <p className="text-sm font-semibold tracking-tight text-zinc-200">
                      Syncing Video Streams...
                    </p>

                    <p className="mt-1 text-xs text-zinc-500">
                      Negotiating secure peer connection
                    </p>
                  </>
                ) : (
                  <>
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-950/80 text-zinc-600">
                      <Users size={28} />
                    </div>

                    <p className="text-sm font-semibold tracking-tight text-zinc-200">
                      Waiting for{" "}
                      {role ===
                      "STUDENT"
                        ? "Mentor"
                        : "Student"}{" "}
                      to join
                    </p>

                    <p className="mt-1 text-xs text-zinc-500">
                      The call will link automatically once they arrive
                    </p>
                  </>
                )}

              </div>
            )}
          </div>
        </div>
      </main>

      {/* ==================================================
          CONTROLS
      ================================================== */}

      <footer className="relative z-20 flex h-20 shrink-0 items-center justify-center border-t border-zinc-800/80 bg-zinc-900/60 px-4 backdrop-blur-xl">

        <div className="flex items-center gap-3 rounded-2xl border border-zinc-800/80 bg-zinc-950/80 px-4 py-2 shadow-2xl backdrop-blur-2xl sm:gap-4">

          {/* MICROPHONE */}

          <button
            type="button"
            onClick={
              toggleMute
            }
            disabled={
              !localStream
            }
            title={
              isMuted
                ? "Unmute Microphone"
                : "Mute Microphone"
            }
            className={`flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-200 active:scale-95 ${
              !localStream
                ? "cursor-not-allowed bg-zinc-900 text-zinc-600"
                : isMuted
                ? "border border-red-500/30 bg-red-500/20 text-red-400 hover:bg-red-500/30"
                : "border border-zinc-700/60 bg-zinc-800/80 text-zinc-200 hover:bg-zinc-700"
            }`}
          >
            {isMuted ? (
              <MicOff
                size={19}
                className="stroke-[2.2]"
              />
            ) : (
              <Mic
                size={19}
                className="stroke-[2.2]"
              />
            )}
          </button>

          {/* CAMERA */}

          <button
            type="button"
            onClick={
              toggleVideo
            }
            disabled={
              !localStream
            }
            title={
              isVideoEnabled
                ? "Turn Off Camera"
                : "Turn On Camera"
            }
            className={`flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-200 active:scale-95 ${
              !localStream
                ? "cursor-not-allowed bg-zinc-900 text-zinc-600"
                : !isVideoEnabled
                ? "border border-red-500/30 bg-red-500/20 text-red-400 hover:bg-red-500/30"
                : "border border-zinc-700/60 bg-zinc-800/80 text-zinc-200 hover:bg-zinc-700"
            }`}
          >
            {isVideoEnabled ? (
              <Video
                size={19}
                className="stroke-[2.2]"
              />
            ) : (
              <VideoOff
                size={19}
                className="stroke-[2.2]"
              />
            )}
          </button>

          <div className="h-6 w-px bg-zinc-800" />

          {/* LEAVE */}

          <button
            type="button"
            onClick={
              handleLeave
            }
            title="Leave Session"
            className="flex h-11 items-center gap-2 rounded-xl bg-red-600 px-5 text-xs font-semibold text-white shadow-lg shadow-red-600/20 transition-all duration-200 hover:bg-red-700 active:scale-95"
          >
            <PhoneOff
              size={17}
              className="stroke-[2.2]"
            />

            <span className="hidden sm:inline">
              Leave Session
            </span>
          </button>

        </div>
      </footer>
    </div>
  );
};

export default VideoCall;