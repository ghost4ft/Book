import tokenService from "../services/tokenService.js"
import User from "../models/userModel.js"

const protectedRoute = async (req, res, next) => { 
    try {
        const token = req.headers.authorization
        if (!token)
            return res.status(401).json({ message: "Unauthorized" })

        const userToken = tokenService.verify(token)

        if (!userToken)
            return res.status(401).json({ message: "Invalid token" })

        const user = await User.findById(userToken.id).select("-password")
        if (!user)
            return res.status(401).json({ message: "Unauthorized" })

        req.user = user
        next()
    } catch (error) {
        next(error)
    }
}

export default protectedRoute