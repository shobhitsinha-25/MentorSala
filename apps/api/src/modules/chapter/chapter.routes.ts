import {
  Router,
} from "express";

import {
  adminProtect,
} from "../admin/admin.auth.middleware";

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

// ======================================================
// GET ALL CHAPTERS (NO PAGINATION)
// ======================================================

router.get(

  "/all",

  adminProtect,

  getAllChaptersController

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