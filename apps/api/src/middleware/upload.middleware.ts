import multer
from "multer";

// Memory storage
const storage =
  multer.memoryStorage();

// File filter
const fileFilter:
  multer.Options["fileFilter"] = (

    req,

    file,

    cb

  ) => {

    // Allow only PDFs
    if (

      file.mimetype ===
      "application/pdf"

    ) {

      cb(null, true);

    } else {

      cb(

        new Error(
          "Only PDF resumes allowed"
        )

      );

    }

  };

const upload =
  multer({

    storage,

    fileFilter,

    limits: {

      fileSize:
        5 * 1024 * 1024,

    },

  });

export default upload;