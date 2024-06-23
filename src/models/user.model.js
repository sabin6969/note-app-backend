import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt";

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


userSchema.pre("save",async function(){
    // encrypt the password only if password is modified otherwise there is no sense of encrypting password when other fields or property changes
    if(this.isModified("password")){
        const encryptedPassword = await bcrypt.hash(this.password,10);
        this.password = encryptedPassword;
    }
});

export const User = mongoose.model("User",userSchema);