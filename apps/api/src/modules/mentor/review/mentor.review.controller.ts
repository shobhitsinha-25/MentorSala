import type { Request, Response } from "express";

import {
  createMentorReview,
} from "./mentor.review.service";

export const createMentorReviewController = async (
  req: Request,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const studentId = req.user.userId;

    const sessionId =
      req.params.sessionId as string;

    if (!sessionId) {
      return res.status(400).json({
        success: false,
        message: "Session ID is required.",
      });
    }

    const {
      rating,
      comment,
    } = req.body;

    if (rating === undefined || rating === null) {
      return res.status(400).json({
        success: false,
        message: "Rating is required.",
      });
    }

    const numericRating = Number(rating);

    if (
      !Number.isInteger(numericRating) ||
      numericRating < 1 ||
      numericRating > 5
    ) {
      return res.status(400).json({
        success: false,
        message: "Rating must be an integer between 1 and 5.",
      });
    }

    const result =
      await createMentorReview({
        sessionId,
        studentId,
        rating: numericRating,
        comment,
      });

    return res.status(201).json({
      success: true,
      message: "Mentor review submitted successfully.",
      data: {
        review: result.review,
        mentor: {
          id: result.mentor.id,
          rating: result.mentor.rating,
          totalReviews: result.mentor.totalReviews,
        },
      },
    });
  } catch (error) {
    console.error(
      "Create mentor review error:",
      error
    );

    const message =
      error instanceof Error
        ? error.message
        : "Failed to submit mentor review.";

    return res.status(400).json({
      success: false,
      message,
    });
  }
};