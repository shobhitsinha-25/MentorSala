import {
  Request,
  Response,
} from "express";

import prisma from "../../../config/prisma";

import { asyncHandler }
from "../../../utils/asyncHandler";

import {

  createMentorAvailability,

} from "./availability.service";

import {

  updateMentorAvailability,

  deleteMentorAvailability,

} from "./availability.service";

export const createAvailability =
  asyncHandler(

    async (
      req: Request,
      res: Response
    ) => {

      // =====================================
      // AUTH CHECK
      // =====================================

      if (!req.user) {

        return res.status(401).json({

          success: false,

          message: "Unauthorized",

        });

      }

      // =====================================
      // GET USER ID
      // =====================================

      const userId =
        req.user.userId;

      // =====================================
      // FIND MENTOR
      // =====================================

      const mentor =
        await prisma.mentor.findUnique({

          where: {
            userId,
          },

        });

      // =====================================
      // NOT FOUND
      // =====================================

      if (!mentor) {

        return res.status(404).json({

          success: false,

          message:
            "Mentor profile not found",

        });

      }

      // =====================================
      // BODY
      // =====================================

      const {

        dayOfWeek,

        startTime,

        endTime,

      } = req.body;

      // =====================================
      // CREATE AVAILABILITY
      // =====================================

      const availability =
        await createMentorAvailability(

          mentor.id,

          dayOfWeek,

          startTime,

          endTime

        );

      // =====================================
      // RESPONSE
      // =====================================

      return res.status(201).json({

        success: true,

        message:
          "Availability created successfully",

        availability,

      });

    }

  );

export const updateAvailability =
  asyncHandler(

    async (
      req: Request,
      res: Response
    ) => {

      // =====================================
      // AUTH CHECK
      // =====================================

      if (!req.user) {

        return res.status(401).json({

          success: false,

          message: "Unauthorized",

        });

      }

      // =====================================
      // FIND MENTOR
      // =====================================

      const mentor =
        await prisma.mentor.findUnique({

          where: {

            userId:
              req.user.userId,

          },

        });

      if (!mentor) {

        return res.status(404).json({

          success: false,

          message:
            "Mentor not found",

        });

      }

      // =====================================
      // PARAMS
      // =====================================

      const availabilityId =
        req.params
          .availabilityId as string;

      // =====================================
      // BODY
      // =====================================

      const {

        startTime,

        endTime,

      } = req.body;

      // =====================================
      // UPDATE
      // =====================================

      const availability =
        await updateMentorAvailability(

          availabilityId,

          mentor.id,

          startTime,

          endTime

        );

      // =====================================
      // RESPONSE
      // =====================================

      return res.status(200).json({

        success: true,

        message:
          "Availability updated successfully",

        availability,

      });

    }

  );

  export const deleteAvailability =
  asyncHandler(

    async (
      req: Request,
      res: Response
    ) => {

      // =====================================
      // AUTH CHECK
      // =====================================

      if (!req.user) {

        return res.status(401).json({

          success: false,

          message: "Unauthorized",

        });

      }

      // =====================================
      // FIND MENTOR
      // =====================================

      const mentor =
        await prisma.mentor.findUnique({

          where: {

            userId:
              req.user.userId,

          },

        });

      if (!mentor) {

        return res.status(404).json({

          success: false,

          message:
            "Mentor not found",

        });

      }

      // =====================================
      // PARAMS
      // =====================================

      const availabilityId =
        req.params
          .availabilityId as string;

      // =====================================
      // DELETE
      // =====================================

      await deleteMentorAvailability(

        availabilityId,

        mentor.id

      );

      // =====================================
      // RESPONSE
      // =====================================

      return res.status(200).json({

        success: true,

        message:
          "Availability deleted successfully",

      });

    }

  );  

export const getAvailability =
  asyncHandler(

    async (
      req: Request,
      res: Response
    ) => {

      // =====================================
      // AUTH CHECK
      // =====================================

      if (!req.user) {

        return res.status(401).json({

          success: false,

          message:
            "Unauthorized",

        });

      }

      // =====================================
      // FIND MENTOR
      // =====================================

      const mentor =
        await prisma.mentor.findUnique({

          where: {

            userId:
              req.user.userId,

          },

        });

      // =====================================
      // MENTOR NOT FOUND
      // =====================================

      if (!mentor) {

        return res.status(404).json({

          success: false,

          message:
            "Mentor profile not found",

        });

      }

      // =====================================
      // GET AVAILABILITY
      // =====================================

      const availability =
        await prisma.mentorAvailability.findMany({

          where: {

            mentorId:
              mentor.id,

          },

          orderBy: [

            {

              dayOfWeek:
                "asc",

            },

            {

              startTime:
                "asc",

            },

          ],

        });

      // =====================================
      // RESPONSE
      // =====================================

      return res.status(200).json({

        success: true,

        availability,

      });

    }

  );