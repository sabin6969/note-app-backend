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
        // req.user is provided by authmiddleware by decoding access token
        const owner = await User.findById(req.user._id);
        const note = await Note.create(
            {
                noteTitle: noteTitle,
                noteDescription: noteDescription,
                owner: owner,
            }
        );
        res
        .status(201)
        .json(new ApiResponse(200,"Note created sucessfully",true,note));
    }
});

const deleteNote = asyncHandler(async(req,res)=>{
    const noteId = req?.params?.noteId;
    if (noteId.match(/^[0-9a-fA-F]{24}$/)) {
        // Yes, it's a valid ObjectId, proceed with `findById` call.
        // The noteId provided by us is in the format of string but findById requires it to be in its own format like an object 
        // Stackoverflow reference
        // https://stackoverflow.com/questions/14940660/whats-mongoose-error-cast-to-objectid-failed-for-value-xxx-at-path-id#:~:text=It%20can%20be%20corrected%20by%20making%20path%20of%20both%20routes%20different.&text=I%20went%20with%20an%20adaptation,casting%20as%20a%20validation%20method.&text=Always%20use%20mongoose.,Types.

        res.status(400).json(new ApiResponse(400,"Note id is invalid"))
    }
    else{
        const note = await Note.findById(noteId);
    if(!note){
        res.status(404).json(new ApiResponse(404,"Requested note doesnot exist",false));
    }
    else{
        if(note.owner.toString()===req.user._id.toString()){
            await Note.findByIdAndDelete(noteId);
            res.status(200).json(new ApiResponse(200,"Note deleted",true))
        }
        else{
            res.status(403).json(new ApiResponse(403,"Forbidden to perform this operation"))
        }
    }
    }
});

const updateNote = asyncHandler(async(req,res)=>{
    const noteId = req?.params?.noteId;
    if (!noteId.match(/^[0-9a-fA-F]{24}$/)) {
        // Yes, it's a valid ObjectId, proceed with `findById` call.
        // StackOverflow
        // https://stackoverflow.com/questions/14940660/whats-mongoose-error-cast-to-objectid-failed-for-value-xxx-at-path-id#:~:text=It%20can%20be%20corrected%20by%20making%20path%20of%20both%20routes%20different.&text=I%20went%20with%20an%20adaptation,casting%20as%20a%20validation%20method.&text=Always%20use%20mongoose.,Types.
        res.status(400).json(new ApiResponse(400,"Note id is invalid",false));
    }
    else{
        const note = await Note.findById(noteId);
        if(!note){
            res.status(404).json(new ApiResponse(404,"Note doesnot exits"));
        }
        else{
            if(note.owner.toString()===req.user._id.toString()){
                const {noteTitle,noteDescription} = req.body;
                if([noteTitle,noteDescription].some(e=> typeof e ==="undefined") || [noteId,noteDescription].some(e=> e?.trim()==="")){
                res.status(400).json(new ApiResponse(400,"All fields are required",false));
                }
                else{
                const updatedNote = await Note.findByIdAndUpdate(noteId,{
                    $set:{
                        noteTitle,
                        noteDescription,
                    }
                },{new:true});
                res.status(200).json(new ApiResponse(200,"Note updated sucessfully",true,updatedNote))
                }
            }
            else{
                res.status(403).json(new ApiResponse(403,"Forbidden to perform this operation"))
            }
        }
        
    }
});

const getAllNotes = asyncHandler(async(req,res)=>{
    const userId = req.user._id;
    const notes = await Note.find({owner: userId}).select("-owner");
    res
    .status(200)
    .json(new ApiResponse(200,"Notes fetched sucessfully",true,notes));
})

export {
    createNote,
    deleteNote,
    updateNote,
    getAllNotes,
}