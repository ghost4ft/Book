export default (app) => {
    app.use((req, res, next) => {
        res.status(404).send('404 Not Found')
        next()
    })
}