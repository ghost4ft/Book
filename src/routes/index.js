import userApi from './userApi.js'
import authApi from './authApi.js'
import bookApi from './bookApi.js'

export default (app) => {
    app.use('/api/auth', authApi)
    app.use('/api/users', userApi)
    app.use('/api/books', bookApi)
}