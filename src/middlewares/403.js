export default (app) => {
    app.use((error,req, res, next) => {
        res.status(403).send('403 Forbidden')
        next(error)
    })
}