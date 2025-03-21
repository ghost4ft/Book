import defaultMiddleware from './default.js'
import exceptionMiddleware from './exception.js'
import router from '../routes/index.js'

export default (app) => {
    defaultMiddleware(app)
    router(app)
    exceptionMiddleware(app)
}