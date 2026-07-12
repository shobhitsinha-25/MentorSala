import {
  Request,
  Response,
} from "express";


import {
  assignMentorService
} from "./admin.service";
/*
import{
  createSubjectService,
} from "./admin.service";*/

import { asyncHandler } from "../../utils/asyncHandler";
import { getAllMentorsForAdmin } from "../mentor/mentor.service";



/*export const createCourse =
  asyncHandler(

    async (
      req: Request,
      res: Response
    ) => {

      const {
  title,
  description,
  category,
  batchName,
  duration,
  examType,
  level,
} = req.body;

const course = await createCourseService({
  title,
  description,
  category,
  batchName,
  duration,
  examType,
  level,
});

  res.status(201).json(course);
  }
);

export const createSubject =
  asyncHandler(

    async (
      req: Request,
      res: Response
    ) => {

      const {

        name,

        courseId,

      } = req.body;

      const subject =
        await createSubjectService({

          name,

          courseId,

        });

      return res
        .status(201)
        .json({

          success: true,

          subject,

        });

    }

  );*/

export const assignMentor =
  asyncHandler(

    async (
      req: Request,
      res: Response
    ) => {

      const {

        subjectId,

        mentorId,

      } = req.body;

      const assignment =
        await assignMentorService({

          subjectId,

          mentorId,

        });

      return res
        .status(201)
        .json({

          success: true,

          assignment,

        });

    }

  );

  export const getAllMentors = asyncHandler(
  async (req: Request, res: Response) => {
    const mentors = await getAllMentorsForAdmin();

    return res.status(200).json({
      success: true,
      mentors,
    });
  }
);