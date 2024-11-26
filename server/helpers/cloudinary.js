import cloudinary from "cloudinary";
import multer from "multer";

cloudinary.v2.config({
  cloud_name: "dh5w9x64a",
  api_key: "999589714572672",
  api_secret: "uwWKGtqnLBhFcV8gxVwaDZZ67B4",
  secure: true,
});

const storage = multer.memoryStorage();

export const ImageUploadUtil = async (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.v2.uploader.upload_stream(
      { resource_type: "auto", folder: "dripit-images" },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
    stream.end(fileBuffer);
  });
};

export const upload = multer({ storage });
