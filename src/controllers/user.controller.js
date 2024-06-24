import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import uploadOnCloudinary from "../utils/uploadOnCloudinary.js";
import {COOKIE_OPTIONS} from "../constants.js"

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
                const profileCloudinaryUrl = await uploadOnCloudinary(profileImagePath,"Profile Images");
                if(!profileCloudinaryUrl){
                    res.status(500).json(new ApiResponse(500,"Something went wrong while uploading image try again",false));
                }
                else{
                     await User.create({
                        email:email,
                        password:password,
                        fullName: fullName,
                        profileImageUrl: profileCloudinaryUrl,
                    });
                    res.status(201).json(new ApiResponse(201,"Account created sucessfully proceed towards login",true));
                }
            }
        }
    }
});

const login = asyncHandler(async(req,res)=>{
    const {email,password} = req.body;
    if([email,password].some(e=> typeof e==="undefined") || [email,password].some(e=> e?.trim()==="")){
        res.status(400).json(new ApiResponse(400,"All fields are required",false));
    }
    else{
        let user = await User.findOne({email: email});
        if(!user){
            res.status(404).json(new ApiResponse(404,"User with this email doesnot exist",false))
        }
        else{
            const isPasswordCorrect = await user.comparePassword(password);
            if(!isPasswordCorrect){
                res.status(401).json(new ApiResponse(401,"Provided password is incorrect",false));
            }
            else{
                user.refreshToken = user.generateRefreshToken();
                user.accessToken = user.generateAccessToken();
                await user.save();
                user = await User.findById(user._id).select("-password");
                res.status(200)
                .cookie("refreshToken",refreshToken,COOKIE_OPTIONS)
                .cookie("accessToken",accessToken,COOKIE_OPTIONS)
                .json(new ApiResponse(201,"Login Sucess",true,user));
            }
        }
    }
});

const logout = asyncHandler(async(req,res)=>{
    const _id = req.user._id;
    const user = await User.findById(_id);
    user.refreshToken = undefined;
    await user.save();
    res.status(200)
    .clearCookie("accessToken",COOKIE_OPTIONS)
    .clearCookie("refreshToken",COOKIE_OPTIONS)
    .json(new ApiResponse(200,"Logout Sucessfull",true));
})

export {
    createAccount,
    login,
    logout,
}