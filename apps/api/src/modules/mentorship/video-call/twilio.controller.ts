import type { Request, Response } from "express";

import {
  createTwilioIceServers,
} from "./twilio.service";

// ======================================================
// GET TWILIO ICE SERVERS
// ======================================================

export const getTwilioIceServers = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log(
      "[VideoCall] Requesting Twilio ICE servers..."
    );

    const result =
      await createTwilioIceServers();

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error(
      "[VideoCall] Failed to create Twilio ICE servers:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Unable to initialize video call networking.",
    });
  }
};