import cloudinary from "cloudinary";
import { INTERNAL_SERVER_ERROR } from "http-status";
import AppError from "./error.utils";

const {CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET} = process.env

export const uploader = async (base64String: string, name: string) => {
  try {
    cloudinary.v2.config({
      cloud_name: CLOUDINARY_CLOUD_NAME,
      api_key: CLOUDINARY_API_KEY,
      api_secret: CLOUDINARY_API_SECRET,
    });
    return await cloudinary.v2.uploader.upload(base64String, { public_id: name });
  } catch (error: any) {
    console.log("error", error)
    throw new AppError(INTERNAL_SERVER_ERROR, `could not upload image, cause: ${error.message}`)
  }
}

