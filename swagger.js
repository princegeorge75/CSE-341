const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Contacts API',
        version: '1.0.0',
        description: 'A simple API for managing contacts'
      },
      servers: [
        {
          url: 'https://cse-341-n1ty.onrender.com',
          description: 'Live server'
        }
      ],
      components: {
        schemas: {
          Contact: {
            type: 'object',
            properties: {
              _id: {
                type: 'string',
                description: 'MongoDB unique identifier'
              },
              firstName: {
                type: 'string',
                example: 'John'
              },
              lastName: {
                type: 'string',
                example: 'Doe'
              },
              email: {
                type: 'string',
                example: 'john.doe@example.com'
              },
              favoriteColor: {
                type: 'string',
                example: 'Blue'
              },
              birthday: {
                type: 'string',
                format: 'date',
                example: '2000-01-01'
              }
            }
          }
        }
      }      
    },
    apis: ['./routes/*.js'],
  };
  

const swaggerSpec = swaggerJSDoc(options);

function setupSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = setupSwagger;
