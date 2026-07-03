import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// Route Module Imports
import authRoutes from "./modules/auth/auth.routes";
import userRoutes from "./modules/user/user.routes";
import taskRoutes from "./modules/task/task.routes";
import mentorRoutes
from "./modules/mentor/mentor.routes";


// Error Handler Middleware Import
import { errorHandler } from "./middleware/error.middleware";
import adminAuthRoutes from "./modules/admin/admin.auth.routes";
import availabilityRoutes from "./modules/mentorship/availability/availability.routes";
import slotRoutes from "./modules/mentorship/slot/slot.routes";
import sessionRoutes from "./modules/mentorship/session/session.routes";
import adminQuestionRoutes from "./modules/question/admin/admin.question.routes"

import studentQuestionRoutes from "./modules/question/student/student.question.routes";
import subscriptionRoutes from "./modules/subscription/subscription.routes";

import subjectRoutes from "./modules/subject/subject.routes";
import chapterRoutes from "./modules/chapter/chapter.routes"
import adminTestRoutes from "./modules/test/admin/admin.test.routes";
import builderRoutes from "./modules/test/builder/builder.routes";
import uploadRoutes from "./modules/upload/upload.routes";
const app = express();


app.use(
  cors({
    origin: true, 
    credentials: true,               
  })
);
app.use(express.json());
app.use(cookieParser());


app.get("/", (req, res) => {
  res.send("MentorSala API Running");
});

// Primary Endpoint Matrices
app.use("/api/auth", authRoutes);       
app.use("/api/user", userRoutes);       
app.use("/api/tasks", taskRoutes);

app.use(
  "/api/mentors",
  mentorRoutes
);


app.use(
  "/api/admin-auth",
  adminAuthRoutes
);

app.use(
  "/api/mentor/availability",
  availabilityRoutes
);

app.use(
  "/api/slots",
  slotRoutes
);

app.use(
  "/api/sessions",
  sessionRoutes
);

// ==========================================
// ADMIN QUESTION BANK
// ==========================================

app.use(
  "/api/admin/questions",
  adminQuestionRoutes
);

// ==========================================
// STUDENT QUESTIONS
// ==========================================

app.use(
  "/api/questions",
  studentQuestionRoutes
);

app.use(
  "/api/plans",
  subscriptionRoutes
);

app.use(
  "/api/admin/subjects",
  subjectRoutes
);

app.use(
  "/api/admin/chapters",
  chapterRoutes
);

app.use(
  "/api/admin/tests",
  adminTestRoutes
);

app.use(
  "/api/admin/tests",
  builderRoutes
);

app.use(

"/api/upload",

uploadRoutes

);

app.use(errorHandler);

export default app;