import crypto from "crypto";

import bcrypt from "bcrypt";

import prisma from "../../config/prisma";

import { Resend } from "resend";

const resend = new Resend(
  process.env.RESEND_API_KEY
);

const OTP_EXPIRY_MINUTES = 10;

const MAX_ATTEMPTS = 5;

const generateOTP = (): string => {
  return crypto
    .randomInt(100000, 1000000)
    .toString();
};

const hashOTP = (
  otp: string
): string => {
  return crypto
    .createHash("sha256")
    .update(otp)
    .digest("hex");
};

export const sendPasswordResetCode =
  async (
    email: string
  ) => {
    const normalizedEmail =
      email.trim().toLowerCase();

    const user =
      await prisma.user.findUnique({
        where: {
          email: normalizedEmail,
        },
      });

    /*
     * Do not reveal whether an account
     * exists for this email.
     */
    if (!user) {
      return;
    }

    /*
     * Invalidate previous codes.
     */
    await prisma.passwordResetCode.updateMany({
      where: {
        email: normalizedEmail,
        verified: false,
      },
      data: {
        verified: true,
      },
    });

    const otp =
      generateOTP();

    const codeHash =
      hashOTP(otp);

    const expiresAt =
      new Date(
        Date.now() +
          OTP_EXPIRY_MINUTES *
            60 *
            1000
      );

    await prisma.passwordResetCode.create({
      data: {
        email: normalizedEmail,
        codeHash,
        expiresAt,
      },
    });

    await resend.emails.send({
      from: `MentorSala <${process.env.EMAIL_FROM}>`,
      to: normalizedEmail,
      subject:
        "Your MentorSala Password Reset Code",
      html: `
        <!DOCTYPE html>
        <html>
          <body
            style="
              margin: 0;
              padding: 0;
              background: #f8fafc;
              font-family: Arial, sans-serif;
            "
          >
            <div
              style="
                max-width: 560px;
                margin: 40px auto;
                background: #ffffff;
                border-radius: 16px;
                padding: 32px;
                border: 1px solid #e2e8f0;
              "
            >

              <h2
                style="
                  margin: 0 0 16px;
                  color: #0f172a;
                "
              >
                Reset your MentorSala password
              </h2>

              <p
                style="
                  color: #475569;
                  line-height: 1.6;
                "
              >
                We received a request to reset your
                MentorSala account password.
              </p>

              <p
                style="
                  color: #475569;
                  line-height: 1.6;
                "
              >
                Use the verification code below:
              </p>

              <div
                style="
                  margin: 28px 0;
                  padding: 18px;
                  text-align: center;
                  border-radius: 12px;
                  background: #f1f5ff;
                  color: #4f46e5;
                  font-size: 32px;
                  font-weight: 700;
                  letter-spacing: 8px;
                "
              >
                ${otp}
              </div>

              <p
                style="
                  color: #64748b;
                  font-size: 14px;
                  line-height: 1.6;
                "
              >
                This code will expire in
                ${OTP_EXPIRY_MINUTES} minutes.
              </p>

              <p
                style="
                  color: #64748b;
                  font-size: 14px;
                  line-height: 1.6;
                "
              >
                If you did not request a password
                reset, you can safely ignore this email.
              </p>

              <br />

              <p
                style="
                  color: #475569;
                "
              >
                Regards,<br />
                <strong>MentorSala Team</strong>
              </p>

            </div>
          </body>
        </html>
      `,
    });
  };

export const verifyPasswordResetCode =
  async (
    email: string,
    code: string
  ) => {
    const normalizedEmail =
      email.trim().toLowerCase();

    const resetCode =
      await prisma.passwordResetCode.findFirst({
        where: {
          email: normalizedEmail,
          verified: false,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

    if (!resetCode) {
      throw new Error(
        "Invalid or expired verification code"
      );
    }

    if (
      resetCode.expiresAt.getTime() <
      Date.now()
    ) {
      throw new Error(
        "Verification code has expired"
      );
    }

    if (
      resetCode.attempts >=
      MAX_ATTEMPTS
    ) {
      throw new Error(
        "Too many incorrect attempts. Please request a new code."
      );
    }

    const codeHash =
      hashOTP(code);

    if (
      codeHash !==
      resetCode.codeHash
    ) {
      await prisma.passwordResetCode.update({
        where: {
          id: resetCode.id,
        },
        data: {
          attempts: {
            increment: 1,
          },
        },
      });

      throw new Error(
        "Invalid verification code"
      );
    }

    await prisma.passwordResetCode.update({
      where: {
        id: resetCode.id,
      },
      data: {
        verified: true,
      },
    });

    return true;
  };

export const resetPassword =
  async (
    email: string,
    code: string,
    newPassword: string
  ) => {
    const normalizedEmail =
      email.trim().toLowerCase();

    const resetCode =
      await prisma.passwordResetCode.findFirst({
        where: {
          email: normalizedEmail,
          verified: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

    if (!resetCode) {
      throw new Error(
        "Please verify your email first"
      );
    }

    /*
     * Keep the reset verification valid only
     * for the original OTP lifetime.
     */
    if (
      resetCode.expiresAt.getTime() <
      Date.now()
    ) {
      throw new Error(
        "Password reset session has expired. Please request a new code."
      );
    }

    const user =
      await prisma.user.findUnique({
        where: {
          email: normalizedEmail,
        },
      });

    if (!user) {
      throw new Error(
        "Unable to reset password"
      );
    }

    const hashedPassword =
      await bcrypt.hash(
        newPassword,
        12
      );

    await prisma.$transaction([
      prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          password: hashedPassword,
        },
      }),

      prisma.passwordResetCode.delete({
        where: {
          id: resetCode.id,
        },
      }),
    ]);
  };