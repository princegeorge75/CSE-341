const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

// GET all contacts
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET one contact by ID
router.get("/:id", async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: "Contact not found" });
    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };

  try {
    const result = await mongodb.getDb().db().collection('contacts').insertOne(contact);
    res.status(201).json({ id: result.insertedId });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create contact', error: err });
  }
});

const ObjectId = require('mongodb').ObjectId;

router.put('/:id', async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const updatedContact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };

  try {
    const result = await mongodb.getDb().db().collection('contacts').replaceOne({ _id: userId }, updatedContact);
    if (result.modifiedCount > 0) {
      res.status(204).send(); // No Content
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to update contact', error: err });
  }
});

router.delete('/:id', async (req, res) => {
  const userId = new ObjectId(req.params.id);
  try {
    const result = await mongodb.getDb().db().collection('contacts').deleteOne({ _id: userId });
    if (result.deletedCount > 0) {
      res.status(200).json({ message: 'Contact deleted' });
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete contact', error: err });
  }
});

module.exports = router;
