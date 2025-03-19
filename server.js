const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json()); //This is my middleware to parse JSON

const contactsRouter = require("./routes/contacts"); //Import routes
app.use("/contacts", contactsRouter); //Connect routes to Express app

//Connect to MongoDB
mongoose    
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error(err));

app.listen(process.env.PORT, () => {
    console.log(`Sever is actively running on port ${process.env.PORT}`)
});