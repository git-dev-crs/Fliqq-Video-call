import { Schema } from "mongoose";
import mongoose from "mongoose";

const userSchema = new Schema(
    {
        name: { type: String, required: true },
        username: { type: String, required: true, unique: true },
        password: { type: String, required: false },
        email: { type: String, required: false },
        token: { type: String },
        bio: { type: String, default: "" },
        location: { type: String, default: "" },
        photoUrl: { type: String, default: "" }
    }
)

const User = mongoose.model("User", userSchema);

export { User };