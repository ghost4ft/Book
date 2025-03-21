export default (app) => {
    app.use((error, req, res, next) => {
        res.status(error.status || 500).send('Internal Server Error')
        console.log(`Error 500 : ${error.message}`)
        next()
    })
}