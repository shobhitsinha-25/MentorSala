import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../../config/prisma";

export const loginAdmin = async (
  email: string,
  password: string
) => {

  // ===========================================
  // FIND ADMIN
  // ===========================================

  const admin = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  // ===========================================
  // ADMIN EXISTS?
  // ===========================================

  if (!admin || admin.role !== "ADMIN") {
    throw new Error("Invalid admin credentials");
  }

  // ===========================================
  // PASSWORD EXISTS?
  // ===========================================

  if (!admin.password) {
    throw new Error("Password not found");
  }

  // ===========================================
  // VERIFY PASSWORD
  // ===========================================

  const validPassword = await bcrypt.compare(
    password,
    admin.password
  );

  if (!validPassword) {
    throw new Error("Invalid admin credentials");
  }

  // ===========================================
  // CREATE TOKEN
  // ===========================================

  const adminToken = jwt.sign(
    {
      userId: admin.id,
      role: admin.role,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1d",
    }
  );

  return {
    adminToken,
    admin: {
      id: admin.id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    },
  };
};