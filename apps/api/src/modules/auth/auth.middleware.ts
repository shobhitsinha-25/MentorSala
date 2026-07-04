import {
  Request,
  Response,
  NextFunction,
} from "express";

import jwt from "jsonwebtoken";

import { Role } from "@prisma/client";

// ======================================================
// JWT PAYLOAD TYPE
// ======================================================

interface JwtPayload {
  userId: string;
  role: Role;
}

// ======================================================
// EXPRESS GLOBAL TYPES
// ======================================================

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        role: Role;
      };
    }
  }
}

// ======================================================
// PROTECT MIDDLEWARE
// ======================================================

export const protect = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // ==================================================
    // GET TOKEN FROM BEARER HEADER
    // ==================================================

    let bearerToken: string | null = null;

    if (req.headers.authorization?.startsWith("Bearer ")) {
      const extractedToken = req.headers.authorization.split(" ")[1];
      
      // ✅ FIXED: Filter out falsy string representations ("null" / "undefined") passed by frontend components
      if (
        extractedToken && 
        extractedToken !== "null" && 
        extractedToken !== "undefined"
      ) {
        bearerToken = extractedToken;
      }
    }

    // ==================================================
    // GET TOKEN FROM COOKIE OR BEARER
    // ==================================================

    let cookieToken: string | null = null;
    
    if (req.cookies?.accessToken) {
      const extractedCookie = req.cookies.accessToken;
      if (
        extractedCookie && 
        extractedCookie !== "null" && 
        extractedCookie !== "undefined"
      ) {
        cookieToken = extractedCookie;
      }
    }

    const token = cookieToken || bearerToken;

    // ==================================================
    // DEBUG LOGS
    // ==================================================


    // ==================================================
    // NO TOKEN OR INVALID STRING CHECK
    // ==================================================

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access Denied: Missing or malformed authentication token.",
      });
    }

    // ==================================================
    // VERIFY TOKEN
    // ==================================================

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    // ==================================================
    // ATTACH USER TO REQUEST
    // ==================================================

    req.user = {
      userId: decoded.userId,
      role: decoded.role,
    };

    // ==================================================
    // NEXT
    // ==================================================

    return next();

  } catch (error: any) {

    return res.status(401).json({
      success: false,
      message: "Session expired or authentication signature is invalid.",
    });
  }
};

// ======================================================
// ROLE AUTHORIZATION
// ======================================================

export const authorizeRoles = (...roles: Role[]) => {
  return (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    // ==================================================
    // USER EXISTS?
    // ==================================================

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access: Identity context not found.",
      });
    }

    // ==================================================
    // ROLE CHECK
    // ==================================================

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied: Role '${req.user.role}' is not authorized to interact with this route.`,
      });
    }

    // ==================================================
    // NEXT
    // ==================================================

    return next();
  };
};