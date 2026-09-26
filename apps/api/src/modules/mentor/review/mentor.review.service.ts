import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface CreateMentorReviewInput {
  sessionId: string;
  studentId: string;
  rating: number;
  comment?: string;
}

export const createMentorReview = async ({
  sessionId,
  studentId,
  rating,
  comment,
}: CreateMentorReviewInput) => {
  // ======================================================
  // VALIDATE RATING
  // ======================================================

  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    throw new Error("Rating must be an integer between 1 and 5.");
  }

  // ======================================================
  // GET SESSION
  // ======================================================

  const session = await prisma.mentorshipSession.findUnique({
    where: {
      id: sessionId,
    },
    include: {
      mentor: true,
      review: true,
    },
  });

  if (!session) {
    throw new Error("Mentorship session not found.");
  }

  // ======================================================
  // VERIFY STUDENT
  // ======================================================

  if (session.studentId !== studentId) {
    throw new Error(
      "You are not authorized to review this mentorship session."
    );
  }

  // ======================================================
  // SESSION MUST BE COMPLETED
  // ======================================================

  if (session.status !== "COMPLETED") {
    throw new Error(
      "You can only review a completed mentorship session."
    );
  }

  // ======================================================
  // PREVENT DUPLICATE REVIEW
  // ======================================================

  if (session.review) {
    throw new Error(
      "You have already reviewed this mentorship session."
    );
  }

  // ======================================================
  // CREATE REVIEW + UPDATE MENTOR RATING
  // ATOMIC TRANSACTION
  // ======================================================

  const result = await prisma.$transaction(async (tx) => {
    const review = await tx.mentorReview.create({
      data: {
        sessionId,
        studentId,
        mentorId: session.mentorId,
        rating,
        comment:
          comment?.trim() || null,
      },
    });

    const newTotalReviews =
      session.mentor.totalReviews + 1;

    const newRating =
      (
        session.mentor.rating *
          session.mentor.totalReviews +
        rating
      ) / newTotalReviews;

    const mentor = await tx.mentor.update({
      where: {
        id: session.mentorId,
      },
      data: {
        rating: newRating,
        totalReviews: newTotalReviews,
      },
    });

    return {
      review,
      mentor,
    };
  });

  return result;
};