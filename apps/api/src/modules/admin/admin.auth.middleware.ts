import {
  Request,
  Response,
  NextFunction,
} from "express";

import jwt from "jsonwebtoken";

import prisma from "../../config/prisma";

interface AdminJwtPayload {

  userId: string;

  role: string;

}

declare global {

  namespace Express {

    interface Request {

      admin?: {

        id: string;

        name: string;

        email: string;

        role: string;

      };

    }

  }

}

export const adminProtect = async (

  req: Request,

  res: Response,

  next: NextFunction

) => {

  try {

    // ===========================================
    // GET ADMIN TOKEN
    // ===========================================

    const token = req.cookies?.adminToken;

    if (!token) {

      return res.status(401).json({

        success: false,

        message: "Admin login required.",

      });

    }

    // ===========================================
    // VERIFY JWT
    // ===========================================

    const decoded = jwt.verify(

      token,

      process.env.JWT_SECRET as string

    ) as AdminJwtPayload;

    // ===========================================
    // FETCH ADMIN FROM DATABASE
    // ===========================================

    const admin = await prisma.user.findUnique({

      where: {

        id: decoded.userId,

      },

    });

    // ===========================================
    // ADMIN EXISTS?
    // ===========================================

    if (!admin) {

      return res.status(401).json({

        success: false,

        message: "Admin account not found.",

      });

    }

    // ===========================================
    // ROLE CHECK
    // ===========================================

    if (admin.role !== "ADMIN") {

      return res.status(403).json({

        success: false,

        message: "Unauthorized admin.",

      });

    }

    // ===========================================
    // ATTACH ADMIN
    // ===========================================

    req.admin = {

      id: admin.id,

      name: admin.name,

      email: admin.email,

      role: admin.role,

    };

    return next();

  }

  catch {

    return res.status(401).json({

      success: false,

      message: "Invalid admin session.",

    });

  }

};