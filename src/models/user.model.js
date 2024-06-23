import mongoose, {Schema} from "mongoose";

const userSchema = new Schema(
    {
        fullName : {
            type: String,
            required: [true,"Fullname is required"],
        },
        email : {
            type: String,
            unique: [true,"This email is already taken try another one"],
            required: [true,"Email field is required"],
        },
        profileImageUrl: {
            type: String, // image url from cloudinary
            required: [true,"Profile image url is required"],
        },
        password:{
            type: String,
            required: [true,"Password field is required"],
        }
    },
    {timestamps: true}
);


userSchema.pre("save",function(){
   //TODO: encrypt the password before saving into database
});

export const User = mongoose.model("User",userSchema);