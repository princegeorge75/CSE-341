const express = require("express");
const mongoose = require("mongoose");
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
require("dotenv").config();

const app = express();
app.use(express.json()); //This is my middleware to parse JSON

const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Contacts API',
        version: '1.0.0',
        description: 'A simple API to manage contacts',
      },
    },
    apis: ['./server.js'], // Path to the API docs (server.js or other route files)
  };
  

const swaggerSpec = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const contactsRouter = require("./routes/contacts"); //Import routes
app.use("/contacts", contactsRouter); //Connect routes to Express app

//Connect to MongoDB
mongoose    
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error(err));

app.listen(process.env.PORT, () => {
    console.log(`Sever is actively running on port ${process.env.PORT}`)
});