import mongoose, {Schema} from "mongoose";

const noteSchema = new Schema(
    {
        noteTitle: {
            type: String,
            required: true,
        },
        noteDescription:{
            type: String,
            required: true,
        },
        owner:{
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

export const Note = mongoose.model("Note",noteSchema);