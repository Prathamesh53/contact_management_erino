const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { contactModel } = require("./models/contactModel");
const { checkInputs } = require("./controllers/checkInputs");

mongoose
  .connect("mongodb://localhost:27017/erino-assignment")
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((e) => {
    console.log(e);
  });

const app = express();

app.use(cors());
app.use(express.json());

app.get("/test", (req, res) => {
  res.status(200).json({
    message: "Hello World",
  });
});

// Get contacts with pagination
app.get("/contacts", async (req, res) => {
  try {
    const data = await contactModel.find();
    res.status(200).json({
      message: "Contacts fetched successfully",
      contacts: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

//add contacts
app.post("/contacts", async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, company, jobTitle } =
      req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phoneNumber ||
      !company ||
      !jobTitle
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (checkInputs(req) === false) {
      return res.status(400).json({
        message: "Invalid input",
      });
    }

    // find if unique
    const existingEmail = await contactModel.findOne({ email });
    const existingPhoneNumber = await contactModel.findOne({ phoneNumber });
    if (existingEmail || existingPhoneNumber) {
      return res.status(400).json({
        message: "Email or phone number already exists",
      });
    }

    const newContact = await contactModel.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      company,
      jobTitle,
    });

    res.status(201).json({
      message: "Contact created successfully",
      contact: newContact,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

//update contacts
app.put("/contacts/:id", async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, company, jobTitle } =
      req.body;

    if (checkInputs(req) === false) {
      return res.status(400).json({
        message: "Invalid input",
      });
    }

    const updatedContact = await contactModel.findByIdAndUpdate(
      req.params.id,
      {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
        company: company,
        jobTitle: jobTitle,
      },
      { new: true }
    );

    res.status(200).json({
      message: "Contact updated successfully",
      contact: updatedContact,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

//delete contacts
app.delete("/contacts/:id", (req, res) => {
  try {
    const contactId = req.params.id;
    if (contactId.length !== 24) {
      return res.status(400).json({
        message: "Invalid contact ID",
      });
    }

    const contact = contactModel
      .findByIdAndDelete(contactId)
      .then((contact) => {
        if (!contact) {
          return res.status(404).json({
            message: "Contact not found",
          });
        }

        res.status(200).json({
          message: "Contact deleted successfully",
        });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

app.use("/*", (req, res) => {
  res.status(404).json({
    message: "Page not found",
  });
});

app.use((error, req, res, next) => {
  console.log(error);
  res.status(500).json({
    message: "Internal server error",
  });
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
