import { Router } from "express";

import { createAvailability, getAvailability }
from "./availability.controller";
import { authorizeRoles, protect } from "../../auth/auth.middleware";

import {

  updateAvailability,deleteAvailability,} from "./availability.controller";

const router = Router();

router.post(
  "/",
  protect,
  authorizeRoles("MENTOR"),
  createAvailability
);


router.patch(

  "/:availabilityId",

  protect,

  authorizeRoles(
    "MENTOR"
  ),

  updateAvailability

);

router.delete(

  "/:availabilityId",

  protect,

  authorizeRoles(
    "MENTOR"
  ),

  deleteAvailability

);

router.get(

  "/",

  protect,

  authorizeRoles(
    "MENTOR"
  ),

  getAvailability

);
export default router;