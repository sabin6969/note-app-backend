import ApiResponse from "./ApiResponse.js";

const asyncHandler = (func) => async(req,res,next) =>{
   await func(req,res,next).catch((error)=>{
        res.status(error.code || 500).json(new ApiResponse(error.code || 500,error.message || "Something went wrong",false));
    });
}
export default asyncHandler;