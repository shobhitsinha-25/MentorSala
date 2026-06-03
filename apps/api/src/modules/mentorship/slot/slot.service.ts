import prisma from "../../../config/prisma";

import dayjs from "../../../lib/dayjs";

// ======================================================
// GENERATE AVAILABLE SLOTS
// ======================================================

export const generateAvailableSlots = async (

  mentorId: string,

  date: string

) => {

  // ====================================================
  // PARSE DATE IN IST
  // ====================================================

  const selectedDate =
    dayjs.tz(

      date,

      "YYYY-MM-DD",

      "Asia/Kolkata"

    );

  // ====================================================
  // GET DAY OF WEEK
  // ====================================================

  const dayOfWeek =
    selectedDate.day();

  // ====================================================
  // FIND AVAILABILITY
  // ====================================================

  const availability =
    await prisma.mentorAvailability.findMany({

      where: {

        mentorId,

        dayOfWeek,

        isActive: true,

      },

    });

  // ====================================================
  // NO AVAILABILITY
  // ====================================================

  if (
    !availability.length
  ) {

    return [];

  }

  // ====================================================
  // CHECK BLOCKED DATE
  // ====================================================

  const blockedDate =
    await prisma.mentorBlockedDate.findFirst({

      where: {

        mentorId,

        blockedDate: {

          gte:
            selectedDate
              .startOf("day")
              .toDate(),

          lte:
            selectedDate
              .endOf("day")
              .toDate(),

        },

      },

    });

  // ====================================================
  // FULL DAY BLOCKED
  // ====================================================

  if (blockedDate) {

    return [];

  }

  // ====================================================
  // GET EXISTING SESSIONS
  // IGNORE CANCELLED SESSIONS
  // ====================================================

  const existingSessions =
    await prisma.mentorshipSession.findMany({

      where: {

        mentorId,

        status: {

          not: "CANCELLED",

        },

        scheduledAt: {

          gte:
            selectedDate
              .startOf("day")
              .toDate(),

          lte:
            selectedDate
              .endOf("day")
              .toDate(),

        },

      },

      select: {

        scheduledAt: true,

      },

    });

  // ====================================================
  // CONVERT BOOKED TIMES TO SET
  // ====================================================

  const bookedSlots =
    new Set(

      existingSessions.map(

        (session) =>

          dayjs(session.scheduledAt)

            .tz("Asia/Kolkata")

            .format("HH:mm")

      )

    );

  // ====================================================
  // FINAL AVAILABLE SLOTS
  // ====================================================

  const availableSlots:
    string[] = [];

  // ====================================================
  // GENERATE SLOTS
  // ====================================================

  for (
    const slot of availability
  ) {

    // ==================================================
    // START SLOT
    // ==================================================

    let currentSlot =
      dayjs.tz(

        `${date} ${slot.startTime}`,

        "YYYY-MM-DD HH:mm",

        "Asia/Kolkata"

      );

    // ==================================================
    // END SLOT
    // ==================================================

    const endSlot =
      dayjs.tz(

        `${date} ${slot.endTime}`,

        "YYYY-MM-DD HH:mm",

        "Asia/Kolkata"

      );

    // ==================================================
    // 30 MINUTE SLOT GENERATION
    // ==================================================

    while (

      currentSlot.isBefore(
        endSlot
      )

    ) {

      const formattedTime =
        currentSlot.format(
          "HH:mm"
        );

      // ================================================
      // SKIP BOOKED SLOT
      // ================================================

      if (

        !bookedSlots.has(
          formattedTime
        )

      ) {

        availableSlots.push(

          currentSlot

            .utc()

            .toISOString()

        );

      }

      // ================================================
      // NEXT SLOT (+30 MINUTES)
      // ================================================

      currentSlot =
        currentSlot.add(
          30,
          "minute"
        );

    }

  }

  // ====================================================
  // RETURN FINAL SLOTS
  // ====================================================

  return availableSlots;

};