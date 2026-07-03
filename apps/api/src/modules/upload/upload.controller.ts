import { Request, Response } from "express";

import { asyncHandler } from "../../utils/asyncHandler";

import { uploadImage } from "./upload.service";

export const uploadImageController =
asyncHandler(

async (

req: Request,

res: Response

) => {

if (!req.file) {

return res.status(400).json({

success:false,

message:"Image is required."

});

}

const url =
await uploadImage(

req.file

);

return res.json({

success:true,

url,

});

}

);