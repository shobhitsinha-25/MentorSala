import { Request, Response } from "express";

import { asyncHandler } from "../../utils/asyncHandler";

import { createCourseSchema } from "./course.validation";

import { createCourse, searchCourses } from "./course.service";

import { CourseCategory } from "@prisma/client";

import { getAllCourses } from "./course.service";

import { getSingleCourse } from "./course.service";

import { enrollInCourse } from "./course.service";  

import { getMyCourses } from "./course.service";

import { updateCourseProgress } from "./course.service";

export const createCourseController =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {
      const validatedData =
        createCourseSchema.parse(req.body);

      const {
        title,
        description,
        thumbnail,
        price,
        category,
        level,
        duration,
      } = validatedData;

      const mentorId =
        req.user?.userId as string;

      const course = await createCourse(
        title,
        description,
        thumbnail,
        price,
        category as CourseCategory,
        level,
        duration,
        mentorId
      );

      return res.status(201).json({
        success: true,
        course,
      });
    }
  );

 export const getAllCoursesController =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {
      const page = Number(
        req.query.page
      ) || 1;

      const limit = Number(
        req.query.limit
      ) || 10;

      const data =
        await getAllCourses(
          page,
          limit
        );

      return res.status(200).json({
        success: true,
        ...data,
      });
    }
  );

  export const getSingleCourseController =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {
    const id = req.params.id as string;
      const course =
        await getSingleCourse(id);

      return res.status(200).json({
        success: true,
        course,
      });
    }
  );

  export const enrollCourseController =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {
      const courseId =
        req.params.id as string;

      const userId =
        req.user?.userId as string;

      const enrollment =
        await enrollInCourse(
          userId,
          courseId
        );

      return res.status(201).json({
        success: true,
        enrollment,
      });
    }
  );

  export const getMyCoursesController =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {
      const userId =
        req.user?.userId as string;

      const courses =
        await getMyCourses(userId);

      return res.status(200).json({
        success: true,
        courses,
      });
    }
  );

  export const updateProgressController =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {
      const courseId =
        req.params.id as string;

      const userId =
        req.user?.userId as string;

      const {
        progressPercentage,
        completedLessons,
      } = req.body;

      const updatedEnrollment =
        await updateCourseProgress(
          userId,
          courseId,
          progressPercentage,
          completedLessons
        );

      return res.status(200).json({
        success: true,
        enrollment:
          updatedEnrollment,
      });
    }
  );

export const searchCoursesController =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {
      const keyword =
        req.query.keyword as string;

      const category =
        req.query.category as string;

      const level =
        req.query.level as string;

      const courses =
        await searchCourses(
          keyword,
          category,
          level
        );

      return res.status(200).json({
        success: true,
        courses,
      });
    }
  );