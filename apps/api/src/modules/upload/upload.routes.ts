import { Router } from "express";

import multer from "multer";

import {

uploadImageController,

} from "./upload.controller";

const router =
Router();

const upload =
multer({

dest:"uploads/",

});

router.post(

"/image",

upload.single("image"),

uploadImageController

);

export default router;