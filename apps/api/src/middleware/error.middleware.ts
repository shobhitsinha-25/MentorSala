import {
  Request,
  Response,
  NextFunction,
} from "express";

export const errorHandler = (

  err: any,

  req: Request,

  res: Response,

  next: NextFunction

) => {

  // ====================================================
  // DEBUG LOG
  // ====================================================

  console.log(
    "ERROR:",
    err
  );

  // ====================================================
  // DEFAULT VALUES
  // ====================================================

  let statusCode =
    err.statusCode || 500;

  let message =
    "Internal Server Error";

  // ====================================================
  // ZOD VALIDATION ERROR
  // ====================================================

  if (err.errors) {

    message =
      err.errors
        ?.map(
          (e: any) => e.message
        )
        .join(", ");

    statusCode = 400;

  }

  // ====================================================
  // NORMAL ERROR MESSAGE
  // ====================================================

  else if (err.message) {

    message =
      err.message;

  }

  // ====================================================
  // PRISMA UNIQUE CONSTRAINT
  // ====================================================

  if (
    err.code === "P2002"
  ) {

    message =
      "Duplicate field value";

    statusCode = 400;

  }

  // ====================================================
  // PRISMA FOREIGN KEY
  // ====================================================

  if (
    err.code === "P2003"
  ) {

    message =
      "Invalid related record";

    statusCode = 400;

  }

  // ====================================================
  // RESPONSE
  // ====================================================

  return res.status(
    statusCode
  ).json({

    success: false,

    message,

  });

};