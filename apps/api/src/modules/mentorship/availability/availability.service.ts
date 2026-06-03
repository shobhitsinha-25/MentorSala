import prisma from "../../../config/prisma";

// ======================================================
// CREATE AVAILABILITY
// ======================================================

export const createMentorAvailability =
  async (

    mentorId: string,

    dayOfWeek: number,

    startTime: string,

    endTime: string

  ) => {

    // ==================================================
    // VALIDATE TIME RANGE
    // ==================================================

    if (
      startTime >= endTime
    ) {

      throw new Error(

        "Start time must be less than end time"

      );

    }

    // ==================================================
    // CHECK OVERLAPPING AVAILABILITY
    // ==================================================

    const overlappingAvailability =
      await prisma.mentorAvailability.findFirst({

        where: {

          mentorId,

          dayOfWeek,

          AND: [

            {
              startTime: {
                lt: endTime,
              },
            },

            {
              endTime: {
                gt: startTime,
              },
            },

          ],

        },

      });

    // ==================================================
    // OVERLAP EXISTS
    // ==================================================

    if (
      overlappingAvailability
    ) {

      throw new Error(

        "This time period already in your availability or it overlaps with existing availability"

      );

    }

    // ==================================================
    // CREATE AVAILABILITY
    // ==================================================

    const availability =
      await prisma.mentorAvailability.create({

        data: {

          mentorId,

          dayOfWeek,

          startTime,

          endTime,

        },

      });

    // ==================================================
    // RETURN
    // ==================================================

    return availability;

  };

// ======================================================
// GET ALL AVAILABILITY
// ======================================================

export const getMentorAvailability =
  async (

    mentorId: string

  ) => {

    const availability =
      await prisma.mentorAvailability.findMany({

        where: {

          mentorId,

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

    return availability;

  };

// ======================================================
// UPDATE AVAILABILITY
// ======================================================

export const updateMentorAvailability =
  async (

    availabilityId: string,

    mentorId: string,

    startTime: string,

    endTime: string

  ) => {

    // ==================================================
    // VALIDATE TIME RANGE
    // ==================================================

    if (
      startTime >= endTime
    ) {

      throw new Error(

        "Start time must be less than end time"

      );

    }

    // ==================================================
    // FIND AVAILABILITY
    // ==================================================

    const availability =
      await prisma.mentorAvailability.findFirst({

        where: {

          id:
            availabilityId,

          mentorId,

        },

      });

    // ==================================================
    // NOT FOUND
    // ==================================================

    if (!availability) {

      throw new Error(
        "Availability not found"
      );

    }

    // ==================================================
    // CHECK OVERLAP
    // ==================================================

    const overlappingAvailability =
      await prisma.mentorAvailability.findFirst({

        where: {

          mentorId,

          dayOfWeek:
            availability.dayOfWeek,

          id: {

            not:
              availabilityId,

          },

          AND: [

            {
              startTime: {
                lt: endTime,
              },
            },

            {
              endTime: {
                gt: startTime,
              },
            },

          ],

        },

      });

    // ==================================================
    // OVERLAP EXISTS
    // ==================================================

    if (
      overlappingAvailability
    ) {

      throw new Error(

        "Overlapping availability already exists"

      );

    }

    // ==================================================
    // UPDATE
    // ==================================================

    const updatedAvailability =
      await prisma.mentorAvailability.update({

        where: {

          id:
            availabilityId,

        },

        data: {

          startTime,

          endTime,

        },

      });

    // ==================================================
    // RETURN
    // ==================================================

    return updatedAvailability;

  };

// ======================================================
// DELETE AVAILABILITY
// ======================================================

export const deleteMentorAvailability =
  async (

    availabilityId: string,

    mentorId: string

  ) => {

    // ==================================================
    // FIND AVAILABILITY
    // ==================================================

    const availability =
      await prisma.mentorAvailability.findFirst({

        where: {

          id:
            availabilityId,

          mentorId,

        },

      });

    // ==================================================
    // NOT FOUND
    // ==================================================

    if (!availability) {

      throw new Error(
        "Availability not found"
      );

    }

    // ==================================================
    // DELETE
    // ==================================================

    await prisma.mentorAvailability.delete({

      where: {

        id:
          availabilityId,

      },

    });

    // ==================================================
    // RETURN
    // ==================================================

    return {

      success: true,

      message:
        "Availability deleted successfully",

    };

  };

// ======================================================
// TOGGLE AVAILABILITY
// ======================================================

export const toggleAvailabilityStatus =
  async (

    availabilityId: string,

    mentorId: string

  ) => {

    // ==================================================
    // FIND AVAILABILITY
    // ==================================================

    const availability =
      await prisma.mentorAvailability.findFirst({

        where: {

          id:
            availabilityId,

          mentorId,

        },

      });

    // ==================================================
    // NOT FOUND
    // ==================================================

    if (!availability) {

      throw new Error(
        "Availability not found"
      );

    }

    // ==================================================
    // TOGGLE STATUS
    // ==================================================

    const updatedAvailability =
      await prisma.mentorAvailability.update({

        where: {

          id:
            availabilityId,

        },

        data: {

          isActive:
            !availability.isActive,

        },

      });

    // ==================================================
    // RETURN
    // ==================================================

    return updatedAvailability;

  };