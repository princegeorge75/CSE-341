const Contact = require("../models/Contact");
const mongoose = require("mongoose");
require("dotenv").config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected to MongoDB. Adding sample contacts...");
    //Insert sample contacts
    await Contact.insertMany([
      {
        firstName: "John",
        lastName: "Taylor",
        email: "john.taylor@churchofjesuschrist.org",
        favoriteColor: "Blue",
        birthday: "1810-05-10",
      },
      {
        firstName: "Joseph",
        lastName: "Smith",
        email: "joseph.smith@churchofjesuschrist.org",
        favoriteColor: "Green",
        birthday: "1806-12-23",
      },
    ]);

    console.log("Sample contacts added!");
    mongoose.connection.close();
  })
  .catch((err) => console.error(err));
