import defaultMiddleware from './default.js'
import exceptionMiddleware from './exception.js'
import router from '../routes/index.js'
import swagger from './swagger.js'

export default (app) => {
    defaultMiddleware(app)
    router(app)
    swagger(app)
    exceptionMiddleware(app)
}