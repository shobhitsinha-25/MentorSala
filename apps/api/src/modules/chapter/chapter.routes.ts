import {
  Router,
} from "express";

import { protect, authorizeRoles } from "../auth/auth.middleware";
import { Role } from "@prisma/client";
import {
  createChapterController,getChaptersController,
  updateChapterController,deleteChapterController,getAllChaptersController
} from "./chapter.controller";

const router =
  Router();

// ======================================================
// CREATE CHAPTER
// ======================================================

router.post(

  "/",

  protect,
  authorizeRoles(Role.ADMIN),
  createChapterController

);

// ======================================================
// GET CHAPTERS
// ======================================================

router.get(

  "/",

  protect,
  authorizeRoles(Role.ADMIN),

  getChaptersController

);

// ======================================================
// GET ALL CHAPTERS (NO PAGINATION)
// ======================================================

router.get(

  "/all",

  protect,
  authorizeRoles(Role.ADMIN),

  getAllChaptersController

);

router.put(

  "/:chapterId",

  protect,
  authorizeRoles(Role.ADMIN),

  updateChapterController

);

router.delete(

  "/:chapterId",

  protect,
  authorizeRoles(Role.ADMIN),

  deleteChapterController

);

export default router;