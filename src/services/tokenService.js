import jwt from "jsonwebtoken"
import 'dotenv/config'

const sign = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
}
const verify = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        return false
    }
}
const decode = (token) => {
    try {
        return jwt.decode(token)
    } catch (error) {
        return false
    }
}

export default {
    sign,
    verify,
    decode
}