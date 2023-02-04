require("dotenv").config();
const mongoose = require("mongoose");

!process.env.DATABASE_URI
  ? (console.error("A database URI must be provided in ENV"), process.exit(1))
  : null;

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DATABASE_URI)
  .then((result) => console.log("Connection established to database"))
  .catch((error) =>
    console.error(
      "Failure in establishing a connection to MongoDB:",
      error.message
    )
  );

const peepsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Missing content"],
    minlength: [3, "Must be at least 3 letters long"],
    maxlength: [30, "Must be a maximum of 30 letters"],
    match: [/^\p{L}+(\s\p{L}+)*$/u, "Invalid format"],
  },
  number: {
    type: String,
    required: [true, "Missing content"],
    minlength: [8, "Must be at least 8 digits long"],
    maxlength: [20, "Must be a maximum of 20 digits"],
    match: [/^\d+(?:-\d+)?$/, "Invalid format"],
  },
});

peepsSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Peeps", peepsSchema);
