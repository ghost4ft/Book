import bootApp from './src/index.js'
import 'dotenv/config'

bootApp(process.env.APP_PORT)