import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const verifyAccessToken = asyncHandler(async(req,res)=>{
   try {
        const accessToken = req.cookies?.accessToken || req.headers?.authorization?.split(" ")?.[1];
        if(!accessToken){
            res.status(401).json(new ApiResponse(401,"Invalid access token please login again!",false));
        }
        else{
            const decodedInfo = jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET);
            res.status(200).json(new ApiResponse(200,"Sucessfully verified acess token"));
        }
   } catch (error) {
    res.status(401) .json(new ApiResponse(401,"Session expired please login again!",false));
   } 
});

export {verifyAccessToken};