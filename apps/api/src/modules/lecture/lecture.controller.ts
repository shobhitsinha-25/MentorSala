import { Request, Response } from "express";

import * as lectureService from "./lecture.service";

export const createLectureHandler =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const lecture =
        await lectureService.createLecture(
          req.params.courseId as string,
          req.body
        );

      return res.status(201).json({
        success: true,
        lecture,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };

export const getCourseLecturesHandler =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const lectures =
        await lectureService.getCourseLectures(
          req.params.courseId as string,
          req.user!.userId
        );

      return res.status(200).json({
        success: true,
        lectures,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };

export const markLectureCompleteHandler =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const result =
        await lectureService.markLectureComplete(
          req.params.lectureId as string,
          req.user!.userId
        );

      return res.status(200).json({
        success: true,
        result,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };

export const continueLearningHandler =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const result =
        await lectureService.getContinueLearning(
          req.user!.userId
        );

      return res.status(200).json({
        success: true,
        result,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };