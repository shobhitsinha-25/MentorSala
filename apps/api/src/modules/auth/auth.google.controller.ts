import { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import prisma from "../../config/prisma";
import jwt from "jsonwebtoken";

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID
);

export const googleAuth = async (
  req: Request,
  res: Response
) => {

  try {

    const {
      credential,
      role,
    } = req.body;

    if (!credential) {

      return res.status(400).json({

        success: false,

        message:
          "Credential token is required",

      });

    }

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

    const {
      email,
      name,
      picture,
    } = payload;

    console.log("Google picture:", picture);

    let user =
      await prisma.user.findUnique({

        where: {
          email,
        },

      });
console.log("Database avatar:", user?.avatar);
    // ==========================
    // CREATE NEW USER
    // ==========================

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

      // ==========================
      // CREATE MENTOR PROFILE
      // ==========================

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

    // ==========================
    // GET FULL USER
    // ==========================

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

    if (!fullUser) {

      return res.status(404).json({

        success: false,

        message:
          "User not found",

      });

    }

    // ==========================
    // JWT CONFIG
    // ==========================

    const jwtSecret =
      process.env.JWT_SECRET;

    const refreshSecret =
      process.env
        .REFRESH_TOKEN_SECRET;

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

    const isProduction =
      process.env.NODE_ENV ===
      "production";

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

      }
    );

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

      }
    );

    // ==========================
    // RETURN USER
    // ==========================

    return res.status(200).json({

      success: true,

      user:
        fullUser,

    });

  } catch (error) {

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