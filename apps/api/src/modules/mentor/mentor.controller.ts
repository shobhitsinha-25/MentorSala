import type {
  Request,
  Response,
} from "express";

import streamifier
from "streamifier";

import cloudinary
from "../../config/cloudinary";

import prisma
from "../../config/prisma";

import { asyncHandler }
from "../../utils/asyncHandler";

import nodemailer
from "nodemailer";

import { Resend } from "resend";

import {
  getAssignedSubjectsService,
  getMentors,
} from "./mentor.service";

import {
  createChapterService,
} from "./mentor.service";

import {
  getMentorById,
} from "./mentor.service";

// ======================================================
// GET ALL MENTORS
// ======================================================

export const getMentorsController =
  asyncHandler(

    async (
      req: Request,
      res: Response
    ) => {

      const mentors =
        await getMentors();

      return res.status(200).json({

        success: true,

        mentors,

      });

    }

  );



// ======================================================
// GET MENTOR BY ID
// ======================================================

export const getMentorByIdController =
  asyncHandler(

    async (
      req: Request,
      res: Response
    ) => {

      const mentorId =
  req.params.mentorId as string;

      const mentor =
        await getMentorById(
          mentorId
        );

      return res.status(200).json({

        success: true,

        mentor,

      });

    }

  );






const resend = new Resend(
  process.env.RESEND_API_KEY
);

export const submitMentorApplication =
  asyncHandler(

    async (
      req: Request,
      res: Response
    ) => {

      const userId =
        req.user?.userId;

      if (!userId) {

        return res.status(401).json({

          success: false,

          message:
            "Unauthorized",

        });

      }

      const {

        phoneNumber,

        qualification,

        experienceYears,

        expertise,

        bio,

        linkedinUrl,

      } = req.body;

      if (!req.file) {

        return res.status(400).json({

          success: false,

          message:
            "Resume PDF required",

        });

      }

      // ==========================================
      // CLOUDINARY UPLOAD
      // ==========================================

      const uploadToCloudinary =
        () => {

          return new Promise<any>(

            (
              resolve,
              reject
            ) => {

              const stream =
                cloudinary.uploader.upload_stream(

                  {

                    folder:
                      "mentorsala/resumes",

                    resource_type:
                      "raw",

                  },

                  (
                    error,
                    result
                  ) => {

                    if (error)
                      reject(error);

                    else
                      resolve(result);

                  }

                );

              streamifier
                .createReadStream(
                  req.file!.buffer
                )
                .pipe(stream);

            }

          );

        };

      const uploadResult =
        await uploadToCloudinary();

      // ==========================================
      // UPDATE MENTOR
      // ==========================================

      const mentor =
        await prisma.mentor.update({

          where: {

            userId,

          },

          data: {

            phoneNumber,

            qualification,

            experienceYears:
              Number(
                experienceYears
              ),

            expertise:
              JSON.parse(
                expertise
              ),

            bio,

            linkedinUrl,

            resumeUrl:
              uploadResult.secure_url,

            status:
              "PENDING_APPROVAL",

          },

        });

      // ==========================================
      // GET USER
      // ==========================================

      const existingUser =
        await prisma.user.findUnique({

          where: {
            id: userId,
          },

        });

      // ==========================================
      // SEND EMAILS
      // ==========================================

      try {

        // EMAIL TO MENTOR

         resend.emails.send({

          from:
            `MentorSala <${process.env.EMAIL_FROM}>`,

          to:
            existingUser?.email || "",

          subject:
            "MentorSala Application Under Review",

          html: `

            <h2>
              Mentor Application Submitted
            </h2>

            <p>
              Hi ${existingUser?.name},
            </p>

            <p>
              Your mentor application
              has been received and is
              currently under review.
            </p>

            <p>
              Our team will verify your
              profile and get back to
              you shortly.
            </p>

            <p>
              Thank you for joining
              MentorSala.
            </p>

          `,

        });

        // EMAIL TO ADMIN

       resend.emails.send({

          from:
            `MentorSala <${process.env.EMAIL_FROM}>`,

          to:
            process.env
              .ADMIN_EMAIL_RECIPIENT || "",

          subject:
            "New Mentor Application",

          html: `

            <h2>
              New Mentor Application
            </h2>

            <p>
              <b>Name:</b>
              ${existingUser?.name}
            </p>

            <p>
              <b>Email:</b>
              ${existingUser?.email}
            </p>

            <p>
              <b>Phone:</b>
              ${phoneNumber}
            </p>

            <p>
              <b>Qualification:</b>
              ${qualification}
            </p>

            <p>
              <b>Experience:</b>
              ${experienceYears} years
            </p>

            <p>
              <b>LinkedIn:</b>
              ${linkedinUrl}
            </p>

            <p>
              <b>Resume:</b>
              <a href="${uploadResult.secure_url}">
                View Resume
              </a>
            </p>

          `,

        });

      } catch (emailError) {

        console.error(
          "Resend Email Error:",
          emailError
        );

      }

      // ==========================================
      // RESPONSE
      // ==========================================

      return res.status(200).json({

        success: true,

        message:
          "Mentor application submitted successfully",

        mentor,

      });

    }

  );







export const getAssignedSubjects =
  asyncHandler(

    async (
      req: Request,
      res: Response
    ) => {

      const userId =
        req.user?.userId;

      if (!userId) {

        return res
          .status(401)
          .json({

            success: false,

            message:
              "Unauthorized",

          });

      }

      const subjects =
        await getAssignedSubjectsService(

          userId

        );

      return res
        .status(200)
        .json({

          success: true,

          subjects,

        });

    }

  );

  export const createChapter =
  asyncHandler(

    async (
      req: Request,
      res: Response
    ) => {

      const userId =
        req.user?.userId;

      if (!userId) {

        return res
          .status(401)
          .json({

            success: false,

            message:
              "Unauthorized",

          });

      }

      const {

        title,

        description,

        subjectId,

        order,

      } = req.body;

      const chapter =
        await createChapterService({

          title,

          description,

          subjectId,

          order,

          userId,

        });

      return res
        .status(201)
        .json({

          success: true,

          chapter,

        });

    }

  );