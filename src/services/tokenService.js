import jwt from "jsonwebtoken"
import 'dotenv/config'

const sign = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
}
const verify = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}
const decode = (token) => {
    return jwt.decode(token);
}

export default {
    sign,
    verify,
    decode
}