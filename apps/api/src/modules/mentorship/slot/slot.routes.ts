import { Router }
from "express";

import {
  getAvailableSlots,
} from "./slot.controller";

const router = Router();

router.get(
  "/:mentorId",
  getAvailableSlots
);



export default router;