import {Note} from "../models/note.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import {User} from "../models/user.model.js";

const createNote = asyncHandler(async(req,res)=>{
    const {noteTitle,noteDescription} = req.body;
    if([noteTitle,noteDescription].some(e=> typeof e==="undefined") || [noteTitle,noteDescription].some(e=> e?.trim()==="")){
        res
        .status(400)
        .json(new ApiResponse(400,"All fields are required",false))
    }
    else{
        // req.user is provided by authmiddleware
        const owner = await User.findById(req.user._id);
        const note = await Note.create(
            {
                noteTitle: noteTitle,
                noteDescription: noteDescription,
                owner: owner,
            }
        );
        res
        .status(200)
        .json(new ApiResponse(200,"Note created sucessfully",true,note));
    }
});


export {
    createNote,
}