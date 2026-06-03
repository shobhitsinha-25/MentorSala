import {
  Request,
  Response,
} from "express";

import { asyncHandler }
from "../../../utils/asyncHandler";

import {
  generateAvailableSlots,
} from "./slot.service";
import { getMentorSessions } from "../session/session.service";

export const getAvailableSlots =
  asyncHandler(

    async (
      req: Request,
      res: Response
    ) => {

      const mentorId =
        req.params.mentorId as string;

      const date =
        req.query.date as string;

      // ==========================================
      // VALIDATE DATE
      // ==========================================

      if (!date) {

        return res.status(400).json({

          success: false,

          message:
            "Date is required",

        });

      }

      // ==========================================
      // GENERATE SLOTS
      // ==========================================

      const slots =
        await generateAvailableSlots(

          mentorId,

          date

        );

      // ==========================================
      // RESPONSE
      // ==========================================

      return res.status(200).json({

        success: true,

        slots,

      });

    }

  );

// ======================================================
// GET MENTOR SESSIONS
// ======================================================

