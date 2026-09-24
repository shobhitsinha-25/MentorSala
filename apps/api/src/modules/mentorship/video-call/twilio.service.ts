import twilio from "twilio";

// ======================================================
// ENVIRONMENT VARIABLES
// ======================================================

const TWILIO_ACCOUNT_SID =
  process.env.TWILIO_ACCOUNT_SID;

const TWILIO_API_KEY =
  process.env.TWILIO_API_KEY;

const TWILIO_API_SECRET =
  process.env.TWILIO_API_SECRET;

// ======================================================
// TYPES
// ======================================================

export type TwilioIceServer = {
  urls: string | string[];
  username?: string;
  credential?: string;
};

export type TwilioIceServersResult = {
  iceServers: TwilioIceServer[];
  ttl: number;
};

// ======================================================
// VALIDATE TWILIO CONFIGURATION
// ======================================================

const validateTwilioConfiguration = (): void => {
  if (!TWILIO_ACCOUNT_SID) {
    throw new Error(
      "TWILIO_ACCOUNT_SID is not configured."
    );
  }

  if (!TWILIO_API_KEY) {
    throw new Error(
      "TWILIO_API_KEY is not configured."
    );
  }

  if (!TWILIO_API_SECRET) {
    throw new Error(
      "TWILIO_API_SECRET is not configured."
    );
  }
};

// ======================================================
// CREATE TWILIO CLIENT
// ======================================================

const getTwilioClient = () => {
  validateTwilioConfiguration();

  return twilio(
    TWILIO_API_KEY,
    TWILIO_API_SECRET,
    {
      accountSid: TWILIO_ACCOUNT_SID,
    }
  );
};

// ======================================================
// CREATE NETWORK TRAVERSAL TOKEN
// ======================================================

export const createTwilioIceServers =
  async (): Promise<TwilioIceServersResult> => {
    const client = getTwilioClient();

    /**
     * MentorSala mentorship sessions
     * are currently 30 minutes.
     *
     * Give the temporary TURN credentials
     * a 1-hour lifetime.
     */
    const ttl = 3600;

    console.log(
      "[Twilio] Creating Network Traversal token..."
    );

    const token =
      await client.tokens.create({
        ttl,
      });

    console.log(
      "[Twilio] Network Traversal token created successfully."
    );

    // ==================================================
    // CONVERT TWILIO ICE SERVERS
    // ==================================================

    const iceServers: TwilioIceServer[] = [];

    for (const server of token.iceServers) {
      /**
       * Twilio's SDK types allow urls to be undefined.
       *
       * RTCPeerConnection requires a valid URL,
       * so ignore any invalid entry.
       */
      if (!server.urls) {
        continue;
      }

      const iceServer: TwilioIceServer = {
        urls: server.urls,
      };

      if (server.username) {
        iceServer.username =
          server.username;
      }

      if (server.credential) {
        iceServer.credential =
          server.credential;
      }

      iceServers.push(iceServer);
    }

    console.log(
      `[Twilio] Received ${iceServers.length} ICE servers.`
    );

    return {
      iceServers,
      ttl: Number(token.ttl),
    };
  };