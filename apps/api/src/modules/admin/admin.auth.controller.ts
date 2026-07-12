import {
  Request,
  Response,
} from "express";



import { asyncHandler } from "../../utils/asyncHandler";
import { loginUser } from "../auth/auth.service";
import { Role } from "@prisma/client";
import prisma from "../../config/prisma";





// ======================================================
// ADMIN LOGIN
// ======================================================

export const adminLogin = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // ==========================================
    // USE COMMON LOGIN SERVICE
    // ==========================================

    const data = await loginUser(email, password);

    // ==========================================
    // ROLE CHECK
    // ==========================================

    if (data.user.role !== Role.ADMIN) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized admin.",
      });
    }

    // ==========================================
    // COOKIE OPTIONS
    // ==========================================

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite:
        process.env.NODE_ENV === "production"
          ? ("none" as const)
          : ("lax" as const),
      path: "/",
    };

    // ==========================================
    // ACCESS TOKEN
    // ==========================================

    res.cookie("accessToken", data.accessToken, {
      ...cookieOptions,
      maxAge: 15 * 60 * 1000,
    });

    // ==========================================
    // REFRESH TOKEN
    // ==========================================

    res.cookie("refreshToken", data.refreshToken, {
      ...cookieOptions,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Admin login successful",
      user: data.user,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
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

   res.clearCookie("accessToken", {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite:
    process.env.NODE_ENV === "production"
      ? "none"
      : "lax",
  path: "/",
});

res.clearCookie("refreshToken", {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite:
    process.env.NODE_ENV === "production"
      ? "none"
      : "lax",
  path: "/",
});
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
  async (req: Request, res: Response) => {

    const admin = await prisma.user.findUnique({
      where: {
        id: req.user!.userId,
      },
    });

    if (!admin || admin.role !== "ADMIN") {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    const { password, ...safeAdmin } = admin;

    return res.status(200).json({
      success: true,
      admin: safeAdmin,
    });
  }
);