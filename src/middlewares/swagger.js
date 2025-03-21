import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import express from 'express'

const router = express.Router()

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Book Application API',
            version: '1.0.0',
            description: 'API documentation for the Book Application',
        },
        servers: [
            {
                url: `${process.env.APP_HOST}:${process.env.APP_PORT}`,
            },
        ],
        components: {
            securitySchemes: {
                ApiKeyAuth: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'Authorization',
                },
            },
        },
        security: [
            {
                ApiKeyAuth: [],
            },
        ],
    },
    apis: ['./src/routes/*.js', './src/models/*.js'], // Paths to files containing OpenAPI definitions
}

const specs = swaggerJsdoc(options)

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))

export default (app)=>{
    app.use(router)
}