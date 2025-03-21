import tokenService from "../services/tokenService.js"
import User from "../models/userModel.js"
import { isValidEmail } from "../services/emailValidator.js"

const register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body
        if (!username || !email || !password)
            return res.status(400).json({ message: "All fields are required!" })

        if (password.length < 6)
            return res.status(400).json({ message: "Password must be at least 6 characters long!" })

        if (username.length < 6)
            return res.status(400).json({ message: "Username must be at least 6 characters long!" })

        if (!isValidEmail(email))
            return res.status(400).json({ message: "Invalid email" })

        const existingUserUsername = await User.findOne({ username })
        if (existingUserUsername)
            return res.status(400).json({ message: "User with this username already exists!" })

        const existingUserEmail = await User.findOne({ email })
        if (existingUserEmail)
            return res.status(400).json({ message: "User with this email already exists!" })



        const avatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`
        const user = new User({ username, email, password, avatar })
        await user.save()
        const token = tokenService.sign({ id: user._id, role: user.role })
        res.status(201).json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                avatar: user.avatar
            }
        })

    } catch (error) {
        next(error)
    }

}
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        if (!email || !password)
            return res.status(400).json({ message: "All fields are required!" })

        const user = await User.findOne({ email })
        if (!user)
            return res.status(400).json({ message: "Invalid credential!" })

        const isPasswordValid = await user.comparePassword(password)
        if (!isPasswordValid)
            return res.status(400).json({ message: "Invalid credential!" })

        const token = tokenService.sign({ id: user._id, role: user.role })
        res.status(200).json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                avatar: user.avatar
            }
        })

    } catch (error) {
        next(error)

    }

}

export default {
    register,
    login
}