import {
  Request,
  Response,
} from "express";

import jwt from "jsonwebtoken";

import prisma from "../../config/prisma";

import {
  Role,
  ExamType,
} from "@prisma/client";

import {
  asyncHandler,
} from "../../utils/asyncHandler";

import {

  signupSchema,

  loginSchema,

} from "./auth.validation";

import {

  registerUser,

  loginUser,

} from "./auth.service";

// ======================================================
// SIGNUP
// ======================================================

export const signup =
  asyncHandler(

    async (
      req: Request,
      res: Response
    ) => {

      // ==================================================
      // VALIDATE INPUT
      // ==================================================

      const validatedData =
        signupSchema.parse(
          req.body
        );

      const {

        name,

        email,

        password,

        role,

        targetExam,

      } = validatedData;

      // ==================================================
      // ROLE CONTROL
      // ==================================================

      let finalRole: Role =
        Role.STUDENT;

      // ==================================================
      // MENTOR
      // ==================================================

      if (

        role?.toUpperCase() ===
        "MENTOR"

      ) {

        finalRole =
          Role.MENTOR;

      }

      // ==================================================
      // ADMIN (DEV ONLY)
      // ==================================================

      if (

        role?.toUpperCase() ===
          "ADMIN" &&

        process.env.NODE_ENV ===
          "development"

      ) {

        finalRole =
          Role.ADMIN;

      }

      // ==================================================
      // CREATE USER
      // ==================================================

      const user =
        await registerUser(

          name,

          email,

          password,

          finalRole,

          targetExam
            ? targetExam as ExamType
            : undefined

        );

      // ==================================================
      // AUTO LOGIN
      // ==================================================

      const data =
        await loginUser(

          email,

          password

        );

      // ==================================================
      // FETCH FULL USER
      // ==================================================

      const fullUser =
        await prisma.user.findUnique({

          where: {

            id: user.id,

          },

          include: {

            mentorProfile: true,

          },

        });

      // ==================================================
      // USER NOT FOUND
      // ==================================================

      if (!fullUser) {

        return res.status(404).json({

          success: false,

          message:
            "User synchronization failed",

        });

      }

      // ==================================================
      // REMOVE PASSWORD
      // ==================================================

      const {
        password: _,
        ...safeUser
      } = fullUser;

      // ==================================================
      // COOKIE OPTIONS
      // ==================================================

      const cookieOptions = {

        httpOnly: true,

        secure:
          process.env.NODE_ENV ===
          "production",

        sameSite:

          process.env.NODE_ENV ===
          "production"

            ? ("none" as const)

            : ("lax" as const),

        path: "/",

      };

      // ==================================================
      // ACCESS TOKEN COOKIE
      // ==================================================

      res.cookie(

        "accessToken",

        data.accessToken,

        {

          ...cookieOptions,

          maxAge:
            15 *
            60 *
            1000,

        }

      );

      // ==================================================
      // REFRESH TOKEN COOKIE
      // ==================================================

      res.cookie(

        "refreshToken",

        data.refreshToken,

        {

          ...cookieOptions,

          maxAge:
            30 *
            24 *
            60 *
            60 *
            1000,

        }

      );

      // ==================================================
      // RESPONSE
      // ==================================================

      return res.status(201).json({

        success: true,

        accessToken:
          data.accessToken,

        refreshToken:
          data.refreshToken,

        user:
          safeUser,

      });

    }

  );

// ======================================================
// LOGIN
// ======================================================

export const login =
  asyncHandler(

    async (
      req: Request,
      res: Response
    ) => {

      // ==================================================
      // VALIDATE INPUT
      // ==================================================

      const validatedData =
        loginSchema.parse(
          req.body
        );

      const {

        email,

        password,

      } = validatedData;

      // ==================================================
      // LOGIN
      // ==================================================

      const data =
        await loginUser(

          email,

          password

        );

      // ==================================================
      // FULL USER
      // ==================================================

      const fullUser =
        await prisma.user.findUnique({

          where: {

            id: data.user.id,

          },

          include: {

            mentorProfile: true,

          },

        });

      // ==================================================
      // FINAL USER
      // ==================================================

      const finalUser =
        fullUser || data.user;

      // ==================================================
      // REMOVE PASSWORD
      // ==================================================

      const {
        password: _,
        ...safeUser
      } = finalUser as any;

      // ==================================================
      // COOKIE OPTIONS
      // ==================================================

      console.log("NODE_ENV:", process.env.NODE_ENV);

      const cookieOptions = {

        httpOnly: true,

        secure:
          process.env.NODE_ENV ===
          "production",

        sameSite:

          process.env.NODE_ENV ===
          "production"

            ? ("none" as const)

            : ("lax" as const),

        path: "/",

      };

      // ==================================================
      // ACCESS TOKEN COOKIE
      // ==================================================

      res.cookie(

        "accessToken",

        data.accessToken,

        {

          ...cookieOptions,

          maxAge:
            15 *
            60 *
            1000,

        }

      );

      // ==================================================
      // REFRESH TOKEN COOKIE
      // ==================================================

      res.cookie(

        "refreshToken",

        data.refreshToken,

        {

          ...cookieOptions,

          maxAge:
            30 *
            24 *
            60 *
            60 *
            1000,

        }

      );

      // ==================================================
      // RESPONSE
      // ==================================================

      return res.status(200).json({

        success: true,

        accessToken:
          data.accessToken,

        refreshToken:
          data.refreshToken,

        user:
          safeUser,

      });

    }

  );

// ======================================================
// GET CURRENT USER
// ======================================================

export const getCurrentUser =
  asyncHandler(

    async (
      req: Request,
      res: Response
    ) => {

      const userId =
        req.user?.userId;

      // ==================================================
      // AUTH CHECK
      // ==================================================

      if (!userId) {

        return res.status(401).json({

          success: false,

          message:
            "Unauthorized",

        });

      }

      // ==================================================
      // FETCH USER
      // ==================================================

      const user =
        await prisma.user.findUnique({

          where: {

            id: userId,

          },

          include: {

            mentorProfile: true,

          },

        });

      // ==================================================
      // USER NOT FOUND
      // ==================================================

      if (!user) {

        return res.status(404).json({

          success: false,

          message:
            "User not found",

        });

      }

      // ==================================================
      // REMOVE PASSWORD
      // ==================================================

      const {
        password: _,
        ...safeUser
      } = user;

      // ==================================================
      // RESPONSE
      // ==================================================

      return res.status(200).json({

        success: true,

        user:
          safeUser,

      });

    }

  );

// ======================================================
// REFRESH ACCESS TOKEN
// ======================================================

export const refreshAccessToken =
  asyncHandler(

    async (
      req: Request,
      res: Response
    ) => {

      const refreshToken =
        req.cookies.refreshToken;

      // ==================================================
      // TOKEN REQUIRED
      // ==================================================

      if (!refreshToken) {

        return res.status(401).json({

          success: false,

          message:
            "Refresh token required",

        });

      }

      try {

        // ================================================
        // VERIFY TOKEN
        // ================================================

        const decoded =
          jwt.verify(

            refreshToken,

            process.env
              .REFRESH_TOKEN_SECRET as string

          ) as {

            userId: string;

          };

        // ================================================
        // FIND USER
        // ================================================

        const user =
          await prisma.user.findUnique({

            where: {

              id:
                decoded.userId,

            },

            include: {

              mentorProfile: true,

            },

          });

        // ================================================
        // USER NOT FOUND
        // ================================================

        if (!user) {

          return res.status(401).json({

            success: false,

            message:
              "Invalid token",

          });

        }

        // ================================================
        // GENERATE NEW ACCESS TOKEN
        // ================================================

        const accessToken =
          jwt.sign(

            {

              userId:
                user.id,

              role:
                user.role,

            },

            process.env
              .JWT_SECRET as string,

            {

              expiresIn:
                "15m",

            }

          );

        // ================================================
        // SAVE COOKIE
        // ================================================

        res.cookie(

          "accessToken",

          accessToken,

          {

            httpOnly: true,

            secure:
              process.env.NODE_ENV ===
              "production",

            sameSite:
              process.env.NODE_ENV ===
              "production"

                ? ("none" as const)

                : ("lax" as const),

            path: "/",

            maxAge:
              15 *
              60 *
              1000,

          }

        );

        // ================================================
        // REMOVE PASSWORD
        // ================================================

        const {
          password: _,
          ...safeUser
        } = user;

        // ================================================
        // RESPONSE
        // ================================================

        return res.status(200).json({

          success: true,

          accessToken,

          user:
            safeUser,

        });

      } catch (error) {

        return res.status(401).json({

          success: false,

          message:
            "Invalid or expired refresh token",

        });

      }

    }

  );

// ======================================================
// LOGOUT
// ======================================================

export const logout =
  asyncHandler(

    async (
      req: Request,
      res: Response
    ) => {

      res.clearCookie(

        "accessToken",

        {

          path: "/",

        }

      );

      res.clearCookie(

        "refreshToken",

        {

          path: "/",

        }

      );

      return res.status(200).json({

        success: true,

        message:
          "Logged out successfully",

      });

    }

  );

// ======================================================
// ADMIN TEST ROUTE
// ======================================================

export const adminRoute =
  async (

    req: Request,

    res: Response

  ) => {

    return res.status(200).json({

      success: true,

      message:
        "Welcome Admin",

    });

  };