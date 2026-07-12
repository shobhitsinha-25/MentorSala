import bcrypt from "bcrypt";
import prisma from "../src/config/prisma";

async function createAdmin() {
  try {

    // ==========================================
    // CHANGE THESE ONLY ONCE
    // ==========================================

    const name = "MentorSala Admin";

    const email = "support@mentorsala.com";

    const password = "mentorShala$765109##5";

    // ==========================================
    // CHECK EXISTING ADMIN
    // ==========================================

    const existingAdmin = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingAdmin) {
      console.log("✅ Admin already exists.");
      process.exit(0);
    }

    // ==========================================
    // HASH PASSWORD
    // ==========================================

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    // ==========================================
    // CREATE ADMIN
    // ==========================================

    await prisma.user.create({

      data: {

        name,

        email,

        password: hashedPassword,

        role: "ADMIN",

        onboardingCompleted: true,

      },

    });

    console.log("Admin created successfully.");

  } catch (error) {

    console.error(error);

  } finally {

    await prisma.$disconnect();

  }
}

createAdmin();