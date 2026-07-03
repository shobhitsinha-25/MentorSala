import {
  Router,
} from "express";

import {
  adminProtect,
} from "../admin/admin.auth.middleware";

import {
  createChapterController,getChaptersController,
  updateChapterController,deleteChapterController
} from "./chapter.controller";

const router =
  Router();

// ======================================================
// CREATE CHAPTER
// ======================================================

router.post(

  "/",

  adminProtect,

  createChapterController

);

// ======================================================
// GET CHAPTERS
// ======================================================

router.get(

  "/",

  adminProtect,

  getChaptersController

);

router.put(

  "/:chapterId",

  adminProtect,

  updateChapterController

);

router.delete(

  "/:chapterId",

  adminProtect,

  deleteChapterController

);

export default router;