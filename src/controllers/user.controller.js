import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import uploadOnCloudinary from "../utils/uploadOnCloudinary.js";

const createAccount = asyncHandler(async(req,res)=>{
    const {email,password,fullName} = req.body;
    if([email,password,fullName].some(e=> typeof e==="undefined") || [email,password,fullName].some((e)=>e?.trim()==="")){
        res.status(400).json(new ApiResponse(400,"All fields are required",false));
    }
    else{
        const userAlreadyExitsWithEmail = await User.findOne({email:email}) ?? false;
        
        if(userAlreadyExitsWithEmail){
            res.status(409).json(new ApiResponse(409,"User with this email already exist",false));
        }
        else{
            const profileImagePath = req.file?.path;
            if(!profileImagePath){
                res.status(400).json(new ApiResponse(400,"Profile Image is required",false));
            }
            else{
                const profileCloudinaryUrl = await uploadOnCloudinary(profileImagePath);
                if(!profileCloudinaryUrl){
                    res.status(500).json(new ApiResponse(500,"Something went wrong while uploading image try again",false));
                }
                else{
                    const user = await User.create({
                        email:email,
                        password:password,
                        fullName: fullName,
                        profileImageUrl: profileCloudinaryUrl,
                    });
                    res.status(201).json(new ApiResponse(201,"Account created sucessfully proceed towards login",true,user));
                }
            }
        }
    }
});

export {
    createAccount,
}