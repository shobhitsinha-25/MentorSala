import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// Route Module Imports
import authRoutes from "./modules/auth/auth.routes";
import courseRoutes from "./modules/course/course.routes";
import userRoutes from "./modules/user/user.routes";
import lectureRoutes from "./modules/lecture/lecture.routes";
import taskRoutes from "./modules/task/task.routes";
import mentorRoutes
from "./modules/mentor/mentor.routes";


// Error Handler Middleware Import
import { errorHandler } from "./middleware/error.middleware";
import adminAuthRoutes from "./modules/admin/admin.auth.routes";
import availabilityRoutes from "./modules/mentorship/availability/availability.routes";
import slotRoutes from "./modules/mentorship/slot/slot.routes";
import sessionRoutes from "./modules/mentorship/session/session.routes";
import questionRoutes from "./modules/question/question.routes";
import subscriptionRoutes from "./modules/subscription/subscription.routes";

const app = express();


app.use(
  cors({
    origin: "http://localhost:5173", 
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
app.use("/api/courses", courseRoutes);
app.use("/api/user", userRoutes);       
app.use("/api/lectures", lectureRoutes);
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
  "/api/questions",
  questionRoutes
);

app.use(
  "/api/plans",
  subscriptionRoutes
);

  


app.use(errorHandler);

export default app;