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
  name: String,
  number: String,
});

peepsSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Peeps", peepsSchema);
