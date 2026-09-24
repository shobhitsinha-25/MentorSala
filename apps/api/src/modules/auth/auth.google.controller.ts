import type { Request, Response } from "express";

import { OAuth2Client } from "google-auth-library";

import prisma from "../../config/prisma";

import jwt from "jsonwebtoken";

import {
  awardDailyLoginXP,
} from "../gamification/gamification.service";

// ======================================================
// GOOGLE CLIENT
// ======================================================

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID
);

// ======================================================
// GOOGLE AUTH
// ======================================================

export const googleAuth = async (
  req: Request,
  res: Response
) => {

  try {

    const {
      credential,
      role,
    } = req.body;

    // ==================================================
    // CREDENTIAL REQUIRED
    // ==================================================

    if (!credential) {

      return res.status(400).json({

        success: false,

        message:
          "Credential token is required",

      });

    }

    // ==================================================
    // VERIFY GOOGLE TOKEN
    // ==================================================

    const ticket =
      await client.verifyIdToken({

        idToken:
          credential,

        audience:
          process.env
            .GOOGLE_CLIENT_ID,

      });

    const payload =
      ticket.getPayload();

    // ==================================================
    // INVALID GOOGLE TOKEN
    // ==================================================

    if (
      !payload ||
      !payload.email
    ) {

      return res.status(400).json({

        success: false,

        message:
          "Invalid Google token",

      });

    }

    // ==================================================
    // GOOGLE USER DATA
    // ==================================================

    const {
      email,
      name,
      picture,
    } = payload;

    console.log(
      "Google picture:",
      picture
    );

    // ==================================================
    // FIND EXISTING USER
    // ==================================================

    let user =
      await prisma.user.findUnique({

        where: {

          email,

        },

      });

    console.log(
      "Database avatar:",
      user?.avatar
    );

    // ==================================================
    // CREATE NEW USER
    // ==================================================

    if (!user) {

      user =
        await prisma.user.create({

          data: {

            email,

            name:
              name ||
              email.split("@")[0],

            password:
              "GOOGLE_AUTH",

            avatar:
              picture,

            role:
              role ===
              "MENTOR"
                ? "MENTOR"
                : "STUDENT",

            onboardingCompleted:
              false,

          },

        });

      // ================================================
      // CREATE MENTOR PROFILE
      // ================================================

      if (
        user.role ===
        "MENTOR"
      ) {

        await prisma.mentor.create({

          data: {

            userId:
              user.id,

            status:
              "NOT_STARTED",

          },

        });

      }

    }

    // ==================================================
    // GET FULL USER
    // ==================================================

    const fullUser =
      await prisma.user.findUnique({

        where: {

          id: user.id,

        },

        include: {

          mentorProfile:
            true,

        },

      });

    // ==================================================
    // USER NOT FOUND
    // ==================================================

    if (!fullUser) {

      return res.status(404).json({

        success: false,

        message:
          "User not found",

      });

    }

    // ==================================================
    // DAILY LOGIN XP
    // ==================================================

    const xpResult =
      await awardDailyLoginXP(
        fullUser.id
      );

    // ==================================================
    // UPDATE LAST ACTIVE
    // ==================================================

    await prisma.user.update({

      where: {

        id:
          fullUser.id,

      },

      data: {

        lastActiveAt:
          new Date(),

      },

    });

    // ==================================================
    // JWT CONFIG
    // ==================================================

    const jwtSecret =
      process.env.JWT_SECRET;

    const refreshSecret =
      process.env
        .REFRESH_TOKEN_SECRET;

    // ==================================================
    // JWT CONFIG REQUIRED
    // ==================================================

    if (
      !jwtSecret ||
      !refreshSecret
    ) {

      return res.status(500).json({

        success: false,

        message:
          "JWT configuration missing",

      });

    }

    // ==================================================
    // ACCESS TOKEN
    // ==================================================

    const accessToken =
      jwt.sign(

        {

          userId:
            fullUser.id,

          role:
            fullUser.role,

        },

        jwtSecret,

        {

          expiresIn:
            "15m",

        }

      );

    // ==================================================
    // REFRESH TOKEN
    // ==================================================

    const refreshToken =
      jwt.sign(

        {

          userId:
            fullUser.id,

        },

        refreshSecret,

        {

          expiresIn:
            "30d",

        }

      );

    // ==================================================
    // COOKIE ENVIRONMENT
    // ==================================================

    const isProduction =
      process.env.NODE_ENV ===
      "production";

    // ==================================================
    // ACCESS TOKEN COOKIE
    // ==================================================

    res.cookie(

      "accessToken",

      accessToken,

      {

        httpOnly:
          true,

        secure:
          isProduction,

        sameSite:
          isProduction
            ? "none"
            : "lax",

        maxAge:
          15 *
          60 *
          1000,

        path:
          "/",

      }

    );

    // ==================================================
    // REFRESH TOKEN COOKIE
    // ==================================================

    res.cookie(

      "refreshToken",

      refreshToken,

      {

        httpOnly:
          true,

        secure:
          isProduction,

        sameSite:
          isProduction
            ? "none"
            : "lax",

        maxAge:
          30 *
          24 *
          60 *
          60 *
          1000,

        path:
          "/",

      }

    );

    // ==================================================
    // RETURN USER
    // ==================================================

    return res.status(200).json({

      success: true,

      xpAwarded:
        xpResult.amount,

      xp:
        xpResult.xp,

      level:
        xpResult.level,

      user: {

        ...fullUser,

        xp:
          xpResult.xp,

        level:
          xpResult.level,

      },

    });

  } catch (error) {

    // ==================================================
    // GOOGLE AUTH ERROR
    // ==================================================

    console.error(
      "Google Auth Error:",
      error
    );

    return res.status(500).json({

      success: false,

      message:
        "Google authentication failed",

    });

  }

};