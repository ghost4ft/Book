import express from 'express'
import middlewares from './middlewares/index.js'
import {connectDb} from './lib/db.js'

const app = express()
app.disable('x-powered-by')
app.disable('etag')
app.disable('date')
middlewares(app)


export default (port) => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })
    connectDb()
}