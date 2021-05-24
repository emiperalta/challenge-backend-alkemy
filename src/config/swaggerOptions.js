const { PORT } = require('./keys');

module.exports = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Backend Challenge - Alkemy',
      version: '1.0.0',
      description: 'REST API for the backend challenge of Alkemy',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          in: 'header',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/routes/*.js'],
};
