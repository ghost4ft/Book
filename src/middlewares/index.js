import defaultMiddleware from './default.js'
import notfoundMiddleware from './404.js'
import exceptionMiddleware from './exception.js'
import forbiddenMiddleware from './403.js'
import router from '../routes/index.js'

export default (app) => {
    router(app)
    defaultMiddleware(app)
    exceptionMiddleware(app)
    forbiddenMiddleware(app)
    notfoundMiddleware(app)
}