import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlengh: 6 },
    role: { type: String, required: true, default: "user" },
    avatar: { type: String, default: "" }
}, { timestamps: true })

userSchema.pre("save", async function (next) {
    if (!this.isModified("password"))
        return next()
    this.password = await bcrypt.hash(this.password, await bcrypt.genSalt(10))
    next()
})

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}   

export default mongoose.model('User', userSchema)