const register = async (req, res, next) => {
    try {
        res.status(200).send('hi')
    } catch (error) {
        next(error)
    }
    

}
const login = async (req, res, next) => {

}

export default {
    register,
    login
}