import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
        },
        refreshToken:{
            // refresh token field is automatically generated from backend to create a session
            type: String,
            required: false,
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

userSchema.methods.generateAccessToken = function(){
    const accessToken =  jwt.sign(
        {
            _id: this._id,
            email: this.email,
            fullName: this.fullName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    );
    return accessToken;
};


userSchema.methods.generateRefreshToken = function(){
    const refreshToken = jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    );
    return refreshToken;
};

export const User = mongoose.model("User",userSchema);