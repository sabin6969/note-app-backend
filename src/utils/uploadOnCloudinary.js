import {v2 as cloudinary} from "cloudinary";
import fs from "fs";

const uploadOnCloudinary = async (profileImageLocalPath,folder)=>{
    try {
        cloudinary.config({
            api_key: process.env.CLOUDINARY_API_KEY,
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });
        const uploadInstance =  await cloudinary.uploader.upload(profileImageLocalPath,{resource_type:"image",folder:folder});
        fs.unlinkSync(profileImageLocalPath);
        return uploadInstance.url;
    } catch (error) {
        fs.unlinkSync(profileImageLocalPath);
        return null;
    }
}

export default uploadOnCloudinary;