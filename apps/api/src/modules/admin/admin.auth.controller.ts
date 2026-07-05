import {
  Request,
  Response,
} from "express";



import { asyncHandler } from "../../utils/asyncHandler";

// ======================================================
// ADMIN LOGIN
// ======================================================


import { loginAdmin } from "./adminAuth.service";

// ======================================================
// ADMIN LOGIN
// ======================================================

export const adminLogin = asyncHandler(

  async (
    req: Request,
    res: Response
  ) => {

    const {

      email,

      password,

    } = req.body;

    // ==============================================
    // VALIDATION
    // ==============================================

    if (

      !email ||

      !password

    ) {

      return res.status(400).json({

        success: false,

        message: "Email and password are required",

      });

    }

    // ==============================================
    // LOGIN
    // ==============================================

    const {

      adminToken,

      admin,

    } = await loginAdmin(

      email,

      password

    );

    // ==============================================
    // COOKIE
    // ==============================================

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

    // ==============================================
    // RESPONSE
    // ==============================================

    return res.status(200).json({

      success: true,

      message: "Admin login successful",

      admin,

    });

  }

);

// ======================================================
// ADMIN LOGOUT
// ======================================================

export const adminLogout = asyncHandler(

  async (
    req: Request,
    res: Response
  ) => {

    res.clearCookie(

      "adminToken",

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

export const getAdminProfile = asyncHandler(

  async (
    req: Request,
    res: Response
  ) => {

    return res.status(200).json({

      success: true,

      admin: req.admin,

    });

  }

);