import {
  Request,
  Response,
} from "express";

import jwt from "jsonwebtoken";

import { asyncHandler } from "../../utils/asyncHandler";

// ======================================================
// ADMIN LOGIN
// ======================================================

export const adminLogin =
  asyncHandler(

    async (
      req: Request,
      res: Response
    ) => {

      // ================================================
      // REQUEST BODY
      // ================================================

      const {

        username,

        email,

        secretKey,

        secondSecretKey,

      } = req.body;

      // ================================================
      // VALIDATION
      // ================================================

      if (

        !username ||

        !email ||

        !secretKey ||

        !secondSecretKey

      ) {

        return res.status(400).json({

          success: false,

          message:
            "All fields are required",

        });

      }

      // ================================================
      // ENV CHECK
      // ================================================

      const isValidAdmin =

        username ===
          process.env.ADMIN_USERNAME &&

        email ===
          process.env.ADMIN_EMAIL &&

        secretKey ===
          process.env.ADMIN_SECRET_KEY &&

        secondSecretKey ===
          process.env.ADMIN_SECOND_SECRET_KEY;

      // ================================================
      // INVALID CREDENTIALS
      // ================================================

      if (!isValidAdmin) {

        return res.status(401).json({

          success: false,

          message:
            "Invalid admin credentials",

        });

      }

      // ================================================
      // ADMIN TOKEN
      // ================================================

      const adminToken =
        jwt.sign(

          {

            role: "ADMIN",

            admin: true,

          },

          process.env.JWT_SECRET as string,

          {

            expiresIn: "1d",

          }

        );

      // ================================================
      // COOKIE
      // ================================================

      res.cookie(

        "adminToken",

        adminToken,

        {

          httpOnly: true,

          secure:
            process.env.NODE_ENV ===
            "production",

          sameSite:
            process.env.NODE_ENV ===
            "production"

              ? "none"

              : "lax",

          maxAge:
            24 *
            60 *
            60 *
            1000,

          path: "/",

        }

      );

      // ================================================
      // RESPONSE
      // ================================================

      return res.status(200).json({

        success: true,

        message:
          "Admin login successful",

        admin: {

          username:
            process.env.ADMIN_USERNAME,

          email:
            process.env.ADMIN_EMAIL,

          role:
            "ADMIN",

        },

      });

    }

  );

// ======================================================
// ADMIN LOGOUT
// ======================================================

export const adminLogout =
  asyncHandler(

    async (
      req: Request,
      res: Response
    ) => {

      res.clearCookie(

        "adminToken",

        {

          path: "/",

        }

      );

      return res.status(200).json({

        success: true,

        message:
          "Admin logout successful",

      });

    }

  );

// ======================================================
// GET ADMIN PROFILE
// ======================================================

export const getAdminProfile =
  asyncHandler(

    async (
      req: Request,
      res: Response
    ) => {

      return res.status(200).json({

        success: true,

        admin: {

          username:
            process.env.ADMIN_USERNAME,

          email:
            process.env.ADMIN_EMAIL,

          role:
            "ADMIN",

        },

      });

    }

  );