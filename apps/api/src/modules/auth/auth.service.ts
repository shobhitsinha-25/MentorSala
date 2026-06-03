import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

import prisma from "../../config/prisma";

import {

  Role,

  ExamType,

} from "@prisma/client";

// ======================================================
// REGISTER USER
// ======================================================

export const registerUser = async (

  name: string,

  email: string,

  password: string,

  role: Role,

  targetExam?: ExamType

) => {

  // ====================================================
  // CHECK EXISTING USER
  // ====================================================

  const existingUser =
    await prisma.user.findUnique({

      where: {

        email,

      },

    });

  // ====================================================
  // USER EXISTS
  // ====================================================

  if (existingUser) {

    throw new Error(
      "User already exists"
    );

  }

  // ====================================================
  // HASH PASSWORD
  // ====================================================

  const hashedPassword =
    await bcrypt.hash(

      password,

      10

    );

  // ====================================================
  // CREATE USER
  // ====================================================

  const user =
    await prisma.user.create({

      data: {

        name,

        email,

        password:
          hashedPassword,

        role,

        targetExam,

        onboardingCompleted:
          false,

        // ==============================================
        // CREATE MENTOR PROFILE
        // ==============================================

        mentorProfile:

          role === "MENTOR"

            ? {

                create: {

                  status:
                    "NOT_STARTED",

                  resumeUrl:
                    null,

                },

              }

            : undefined,

      },

      include: {

        mentorProfile: true,

      },

    });

  // ====================================================
  // REMOVE PASSWORD
  // ====================================================

  const {
    password: _,
    ...safeUser
  } = user;

  // ====================================================
  // RETURN
  // ====================================================

  return safeUser;

};

// ======================================================
// LOGIN USER
// ======================================================

export const loginUser = async (

  email: string,

  password: string

) => {

  // ====================================================
  // FIND USER
  // ====================================================

  const user =
    await prisma.user.findUnique({

      where: {

        email,

      },

      include: {

        mentorProfile: true,

      },

    });

  // ====================================================
  // USER NOT FOUND
  // ====================================================

  if (!user) {

    throw new Error(
      "Invalid credentials"
    );

  }

  // ====================================================
  // PASSWORD EXISTS?
  // ====================================================

  if (!user.password) {

    throw new Error(

      "Password login not available for this account"

    );

  }

  // ====================================================
  // CHECK PASSWORD
  // ====================================================

  const isPasswordCorrect =
    await bcrypt.compare(

      password,

      user.password

    );

  // ====================================================
  // INVALID PASSWORD
  // ====================================================

  if (!isPasswordCorrect) {

    throw new Error(
      "Invalid credentials"
    );

  }

  // ====================================================
  // ACCESS TOKEN
  // ====================================================

  const accessToken =
    jwt.sign(

      {

        userId:
          user.id,

        role:
          user.role,

      },

      process.env.JWT_SECRET as string,

      {

        expiresIn:
          "15m",

      }

    );

  // ====================================================
  // REFRESH TOKEN
  // ====================================================

  const refreshToken =
    jwt.sign(

      {

        userId:
          user.id,

      },

      process.env
        .REFRESH_TOKEN_SECRET as string,

      {

        expiresIn:
          "30d",

      }

    );

  // ====================================================
  // RETURN
  // ====================================================

  return {

    accessToken,

    refreshToken,

    user: {

      id:
        user.id,

      name:
        user.name,

      email:
        user.email,

      role:
        user.role,

      avatar:
        user.avatar,

      targetExam:
        user.targetExam,

      xp:
        user.xp,

      streak:
        user.streak,

      level:
        user.level,

      onboardingCompleted:
        user.onboardingCompleted,

      mentorProfile:
        user.mentorProfile,

    },

  };

};