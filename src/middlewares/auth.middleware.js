import jwt from "jsonwebtoken";
import ApiResponse from "../utils/ApiResponse.js";

const authMiddleware = (req,res,next)=>{
    // accessing access token from cookie (for web) and from headers (if mobile app)
    const accessToken = req?.cookies?.accessToken || req.headers?.authorization?.split("Bearer ")?.[1];
    if(!accessToken){
        res.status(401).json(new ApiResponse(401,"Unauthorized access",false))
    }
    else{
        try {
            const decodedUser = jwt.decode(accessToken,process.env.ACCESS_TOKEN_SECRET);
            req.user = decodedUser;
            next();
        } catch (error) {
            res.status(500).json(new ApiResponse(500,"Something went wrong while verifying access token",false));
        }
    }
}

export default authMiddleware;