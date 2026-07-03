import cloudinary from "../../config/cloudinary";

export const uploadImage = async (

  file: Express.Multer.File

) => {

  const result =
    await cloudinary.uploader.upload(

      file.path,

      {

        folder: "mentorsala/questions",

      }

    );

  return result.secure_url;

};