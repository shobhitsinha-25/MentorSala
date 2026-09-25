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

import subjectRoutes from "./modules/subject/subject.routes";
import chapterRoutes from "./modules/chapter/chapter.routes"
import adminTestRoutes from "./modules/test/admin/admin.test.routes";
import builderRoutes from "./modules/test/builder/builder.routes";
import uploadRoutes from "./modules/upload/upload.routes";
import studentTestRoutes from "./modules/test/student/student.test.routes";

import adminPlanRoutes from "./modules/admin/plan/admin.plan.routes";
import studentPlanRoutes from "./modules/user/Plans/student.plan.routes";
import paymentRoutes from "./modules/user/Payments/payment.routes";

import razorpayWebhookRoutes from "./modules/razorpay/payment/webhook/razorpay.webhook.routes";

import studentSubscriptionRoutes from "./modules/user/subscription/student.subscription.routes";
import videoCallRoutes from "./modules/mentorship/video-call/videoCall.routes";
import adminDailyProblemRoutes from "./modules/question/admin/daily-problem/admin.dailyProblem.routes";
import studentDailyProblemRoutes from "./modules/question/student/daily-problem/student.dailyProblem.routes";
import adminBlogRoutes from "./modules/admin/blog.routes";

import publicBlogRoutes from "./modules/blog/blog.routes";
import leaderboardRoutes from "./modules/leaderboard/leaderboard.routes";
import testProgressRoutes from "./modules/test-progress/test-progress.routes";

const app = express();


app.use(
  cors({
    origin: true, 
    credentials: true,               
  })
);

app.use(
  "/api/webhooks/razorpay",
  express.raw({
    type: "application/json",
  }),
  razorpayWebhookRoutes
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

app.use(
  "/api/leaderboard",
  leaderboardRoutes
);

app.use(
  "/api/student/test-progress",
  testProgressRoutes
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
  "/api/student/tests",
  studentTestRoutes
);

app.use(
  "/api/student/subscription",
  studentSubscriptionRoutes
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
  "/api/admin/blogs",
  adminBlogRoutes
);

app.use(
  "/api/blogs",
  publicBlogRoutes
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

// Plans...

app.use(
  "/api/admin/plans",
  adminPlanRoutes
);


app.use(
  "/api/admin/daily-problems",
  adminDailyProblemRoutes
);

app.use(
  "/api/student/plans",
  studentPlanRoutes
);

app.use(
  "/api/student/daily-problem",
  studentDailyProblemRoutes
);

// Payments...
app.use(
  "/api/student/payments",
  paymentRoutes
);

app.use(
  "/api/video-call",
  videoCallRoutes
);
app.use(errorHandler);

export default app;