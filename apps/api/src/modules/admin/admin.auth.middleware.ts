import {
  Request,
  Response,
  NextFunction,
} from "express";

import jwt from "jsonwebtoken";

export const adminProtect = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const token =
      req.cookies?.adminToken;

    if (!token) {

      return res.status(401).json({

        success: false,

        message: "Admin login required.",

      });

    }

    const decoded = jwt.verify(

      token,

      process.env.JWT_SECRET as string

    ) as {

      role: string;

      admin: boolean;

    };

    if (

      !decoded.admin ||

      decoded.role !== "ADMIN"

    ) {

      return res.status(403).json({

        success: false,

        message: "Unauthorized admin.",

      });

    }

    return next();

  }

  catch {

    return res.status(401).json({

      success: false,

      message: "Invalid admin session.",

    });

  }

};